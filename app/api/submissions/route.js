import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Submission from "@/models/Submission";
import { uploadWebFiles } from "@/lib/cloudinaryUpload";
import sendEmail from "@/lib/sendEmail";
import {
  enquiryConfirmationTemplate,
  customOrderConfirmationTemplate,
  clientNotificationTemplate,
} from "@/lib/emailTemplates";

// Needs the Node.js runtime (not edge) for mongoose / cloudinary / buffers.
export const runtime = "nodejs";

// An "active" submission is anything not yet completed.
const ACTIVE_STATUSES = ["requested", "in process"];

/**
 * Reads the incoming request body regardless of whether the client sent
 * multipart/form-data (needed for file uploads) or application/json.
 * Returns { fields, files } where fields is a plain object of strings and
 * files is { artwork: File[], endProductInspiration: File[] }.
 */
async function parseBody(request) {
  const contentType = request.headers.get("content-type") || "";

  if (contentType.includes("multipart/form-data")) {
    const formData = await request.formData();
    const fields = {};
    for (const [key, value] of formData.entries()) {
      if (typeof value === "string") fields[key] = value;
    }
    return {
      fields,
      files: {
        artwork: formData.getAll("artwork"),
        endProductInspiration: formData.getAll("endProductInspiration"),
      },
    };
  }

  // Fall back to JSON (fine for a plain "enquiry" with no images)
  const json = await request.json().catch(() => ({}));
  return { fields: json, files: { artwork: [], endProductInspiration: [] } };
}

export async function POST(request) {
  try {
    await connectDB();

    const { fields, files } = await parseBody(request);
    const { type, email } = fields;

    if (!type || !["enquiry", "custom_order"].includes(type)) {
      return NextResponse.json({ message: "type must be 'enquiry' or 'custom_order'" }, { status: 400 });
    }
    if (!email) {
      return NextResponse.json({ message: "email is required" }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Duplicate check: block a new submission only if this email already has one
    // of the SAME type in progress. Different types (enquiry vs custom_order) are
    // independent - submitting one doesn't block the other.
    const existing = await Submission.findOne({
      email: normalizedEmail,
      type,
      status: { $in: ACTIVE_STATUSES },
    });

    if (existing) {
      return NextResponse.json(
        {
          message: `You already have a ${type === "enquiry" ? "enquiry" : "custom order"} submission in progress.`,
          existing: {
            type: existing.type,
            status: existing.status,
            submittedAt: existing.createdAt,
          },
        },
        { status: 409 }
      );
    }

    const submissionData = {
      type,
      email: normalizedEmail,
      name: fields.name,
      company: fields.company,
      phone: fields.phone,
      alternativePhone: fields.alternativePhone,
    };

    if (type === "enquiry") {
      if (!fields.issueRequest) {
        return NextResponse.json({ message: "issueRequest is required for an enquiry" }, { status: 400 });
      }
      submissionData.issueRequest = fields.issueRequest;
    }

    if (type === "custom_order") {
      const {
        gstNo,
        solutionLookingFor,
        size,
        quantity,
        requestDescription,
        dropRequestOrWhatsapp,
        pickupOrDelivery,
        deliveryAddress,
      } = fields;

      if (!solutionLookingFor) {
        return NextResponse.json({ message: "solutionLookingFor is required for a custom order" }, { status: 400 });
      }
      if (!pickupOrDelivery || !["pickup", "delivery"].includes(pickupOrDelivery)) {
        return NextResponse.json({ message: "pickupOrDelivery must be 'pickup' or 'delivery'" }, { status: 400 });
      }
      if (pickupOrDelivery === "delivery" && !deliveryAddress) {
        return NextResponse.json(
          { message: "deliveryAddress is required when pickupOrDelivery is 'delivery'" },
          { status: 400 }
        );
      }

      // Upload images (if any) to Cloudinary
      const [artwork, endProductInspiration] = await Promise.all([
        uploadWebFiles(files.artwork, "corps-prints/artwork"),
        uploadWebFiles(files.endProductInspiration, "corps-prints/inspiration"),
      ]);

      submissionData.gstNo = gstNo;
      submissionData.customOrderRequest = {
        solutionLookingFor,
        size,
        quantity,
        artwork,
        endProductInspiration,
        requestDescription,
        dropRequestOrWhatsapp,
      };
      submissionData.deliveryDetails = { pickupOrDelivery, deliveryAddress };
    }

    const submission = await Submission.create(submissionData);

    // Fire the thank-you email (non-blocking failure)
    const subject =
      type === "enquiry" ? "We've received your enquiry - Corps Prints" : "Your custom order request is in - Corps Prints";
    const html =
      type === "enquiry"
        ? enquiryConfirmationTemplate(submission.name)
        : customOrderConfirmationTemplate(submission.name);

    sendEmail(submission.email, subject, html);

    // Notify the client/business inbox with the full submission details
    const clientEmail = process.env.CLIENT_EMAIL || process.env.EMAIL_USER;
    sendEmail(
      clientEmail,
      `New ${type === "enquiry" ? "Enquiry" : "Custom Order"} submitted - ${submission.name}`,
      clientNotificationTemplate(submission)
    );

    return NextResponse.json({ message: "Submission received successfully.", submission }, { status: 201 });
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
    if (searchParams.get("type")) filter.type = searchParams.get("type");
    if (searchParams.get("status")) filter.status = searchParams.get("status");

    const submissions = await Submission.find(filter).sort({ createdAt: -1 });
    return NextResponse.json(submissions, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error", error: err.message }, { status: 500 });
  }
}