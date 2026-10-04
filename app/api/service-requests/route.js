import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import ServiceRequest from "@/models/ServiceRequest";
import { uploadWebFiles } from "@/lib/cloudinaryUpload";
import sendEmail from "@/lib/sendEmail";
import {
  serviceRequestConfirmationTemplate,
  serviceRequestClientNotificationTemplate,
} from "@/lib/emailTemplates";

export const runtime = "nodejs";

// Same meaning as in the submissions route: anything not yet completed
// counts as "already in progress" for the duplicate check.
const ACTIVE_STATUSES = ["requested", "in process"];

const REQUIRED_FIELDS = ["type", "typeSlug", "category", "categorySlug", "name", "email", "phone", "address"];

export async function POST(request) {
  try {
    await connectDB();

    const formData = await request.formData();
    const fields = {};
    for (const [key, value] of formData.entries()) {
      if (typeof value === "string") fields[key] = value;
    }
    const imageFiles = formData.getAll("images");

    const missing = REQUIRED_FIELDS.filter((k) => !fields[k]);
    if (missing.length) {
      return NextResponse.json({ message: `Missing required field(s): ${missing.join(", ")}` }, { status: 400 });
    }

    const normalizedEmail = fields.email.toLowerCase().trim();

    // Same email + same exact service type + still active → block it,
    // so one person can't raise the same request twice by mistake.
    const existing = await ServiceRequest.findOne({
      email: normalizedEmail,
      typeSlug: fields.typeSlug,
      status: { $in: ACTIVE_STATUSES },
    });

    if (existing) {
      return NextResponse.json(
        {
          message: `You already have a request for "${fields.type}" in progress.`,
          existing: { status: existing.status, submittedAt: existing.createdAt },
        },
        { status: 409 }
      );
    }

    const images = await uploadWebFiles(imageFiles, "corps-prints/service-requests");

    const serviceRequest = await ServiceRequest.create({
      category: fields.category,
      categorySlug: fields.categorySlug,
      type: fields.type,
      typeSlug: fields.typeSlug,
      name: fields.name,
      email: normalizedEmail,
      phone: fields.phone,
      address: fields.address,
      quantity: fields.quantity,
      dimensions: fields.dimensions,
      style: fields.style,
      message: fields.message,
      images,
    });

    // Non-blocking, same as the submissions route: the request is already
    // saved, so an email hiccup shouldn't fail the response.
    sendEmail(
      serviceRequest.email,
      `We've received your request — ${serviceRequest.type} | Corps Prints`,
      serviceRequestConfirmationTemplate(serviceRequest.name, serviceRequest.type)
    );

    const clientEmail = process.env.CLIENT_EMAIL || process.env.EMAIL_USER;
    sendEmail(
      clientEmail,
      `New service request — ${serviceRequest.type} (${serviceRequest.category})`,
      serviceRequestClientNotificationTemplate(serviceRequest)
    );

    return NextResponse.json({ message: "Request received successfully.", serviceRequest }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error", error: err.message }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const filter = {};
    if (searchParams.get("status")) filter.status = searchParams.get("status");
    if (searchParams.get("typeSlug")) filter.typeSlug = searchParams.get("typeSlug");

    const requests = await ServiceRequest.find(filter).sort({ createdAt: -1 });
    return NextResponse.json(requests, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error", error: err.message }, { status: 500 });
  }
}