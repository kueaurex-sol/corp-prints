// import { NextResponse } from "next/server";
// import connectDB from "@/lib/mongodb";
// import ServiceRequest from "@/models/ServiceRequest";
// import { uploadWebFiles } from "@/lib/cloudinaryUpload";
// import sendEmail from "@/lib/sendEmail";
// import {
//   serviceRequestConfirmationTemplate,
//   serviceRequestClientNotificationTemplate,
// } from "@/lib/emailTemplates";

// export const runtime = "nodejs";

// // Same meaning as in the submissions route: anything not yet completed
// // counts as "already in progress" for the duplicate check.
// const ACTIVE_STATUSES = ["requested", "in process"];

// const REQUIRED_FIELDS = [
//   "type",
//   "typeSlug",
//   "category",
//   "categorySlug",
//   "name",
//   "email",
//   "phone",
//   "address",
// ];

// export async function POST(request) {
//   try {
//     await connectDB();

//     const formData = await request.formData();
//     const fields = {};
//     for (const [key, value] of formData.entries()) {
//       if (typeof value === "string") fields[key] = value;
//     }
//     const imageFiles = formData.getAll("images");

//     const missing = REQUIRED_FIELDS.filter((k) => !fields[k]);
//     if (missing.length) {
//       return NextResponse.json(
//         { message: `Missing required field(s): ${missing.join(", ")}` },
//         { status: 400 },
//       );
//     }

//     const normalizedEmail = fields.email.toLowerCase().trim();

//     // Same email + same exact service type + still active → block it,
//     // so one person can't raise the same request twice by mistake.
//     const existing = await ServiceRequest.findOne({
//       email: normalizedEmail,
//       typeSlug: fields.typeSlug,
//       status: { $in: ACTIVE_STATUSES },
//     });

//     if (existing) {
//       return NextResponse.json(
//         {
//           message: `You already have a request for "${fields.type}" in progress.`,
//           existing: {
//             status: existing.status,
//             submittedAt: existing.createdAt,
//           },
//         },
//         { status: 409 },
//       );
//     }

//     const images = await uploadWebFiles(
//       imageFiles,
//       "corps-prints/service-requests",
//     );

//     const serviceRequest = await ServiceRequest.create({
//       category: fields.category,
//       categorySlug: fields.categorySlug,
//       type: fields.type,
//       typeSlug: fields.typeSlug,
//       name: fields.name,
//       email: normalizedEmail,
//       phone: fields.phone,
//       address: fields.address,
//       quantity: fields.quantity,
//       dimensions: fields.dimensions,
//       style: fields.style,
//       message: fields.message,
//       images,
//     });

//     // Non-blocking, same as the submissions route: the request is already
//     // saved, so an email hiccup shouldn't fail the response.
//     sendEmail(
//       serviceRequest.email,
//       `We've received your request — ${serviceRequest.type} | Corps Prints`,
//       serviceRequestConfirmationTemplate(
//         serviceRequest.name,
//         serviceRequest.type,
//       ),
//     );

//     const clientEmail = process.env.CLIENT_EMAIL || process.env.EMAIL_USER;
//     sendEmail(
//       clientEmail,
//       `New service request — ${serviceRequest.type} (${serviceRequest.category})`,
//       serviceRequestClientNotificationTemplate(serviceRequest),
//     );

//     return NextResponse.json(
//       { message: "Request received successfully.", serviceRequest },
//       { status: 201 },
//     );
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json(
//       { message: "Server error", error: err.message },
//       { status: 500 },
//     );
//   }
// }

// export async function GET(request) {
//   try {
//     await connectDB();
//     const { searchParams } = new URL(request.url);
//     const filter = {};
//     if (searchParams.get("status")) filter.status = searchParams.get("status");
//     if (searchParams.get("typeSlug"))
//       filter.typeSlug = searchParams.get("typeSlug");

//     const requests = await ServiceRequest.find(filter).sort({ createdAt: -1 });
//     return NextResponse.json(requests, { status: 200 });
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json(
//       { message: "Server error", error: err.message },
//       { status: 500 },
//     );
//   }
// }

import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import ServiceRequest, { SIZE_UNITS } from "@/models/ServiceRequest";
import { uploadWebFiles, uploadWebDocuments } from "@/lib/cloudinaryUpload";
import sendEmail from "@/lib/sendEmail";
import {
  serviceRequestConfirmationTemplate,
  serviceRequestClientNotificationTemplate,
} from "@/lib/emailTemplates";

export const runtime = "nodejs";

// Same meaning as in the submissions route: anything not yet completed
// counts as "already in progress" for the duplicate check.
const ACTIVE_STATUSES = ["requested", "in process"];

const REQUIRED_FIELDS = [
  "type",
  "typeSlug",
  "category",
  "categorySlug",
  "name",
  "email",
  "phone",
  "quantity",
  "contactPreference",
  "pickupOrDelivery",
];

const ARTWORK_EXTENSIONS = ["pdf", "ai", "psd", "cdr", "eps", "svg", "png", "jpg", "jpeg", "tif", "tiff"];
const DOCUMENT_EXTENSIONS = ["pdf", "doc", "docx", "txt", "rtf", "odt"];
const MAX_FILE_BYTES = 10 * 1024 * 1024; // 10 MB per file
const MAX_FILES = 5;

// Drops the empty placeholder parts browsers can send when nothing was picked.
const realFiles = (list) => list.filter((f) => f && typeof f.arrayBuffer === "function" && f.size > 0);

const extensionOf = (file) => (file.name?.split(".").pop() || "").toLowerCase();

// Returns an error message for the first file that fails, or null if all pass.
function checkFiles(files, label, isAllowed, allowedText) {
  for (const file of files) {
    if (!isAllowed(file)) return `${label}: "${file.name}" isn't an accepted format (${allowedText}).`;
    if (file.size > MAX_FILE_BYTES) return `${label}: "${file.name}" is over 10 MB.`;
  }
  return null;
}

export async function POST(request) {
  try {
    await connectDB();

    const formData = await request.formData();
    const fields = {};
    for (const [key, value] of formData.entries()) {
      if (typeof value === "string") fields[key] = value.trim();
    }

    const artworkFiles = realFiles(formData.getAll("artwork")).slice(0, MAX_FILES);
    const inspirationFiles = realFiles(formData.getAll("endProductInspiration")).slice(0, MAX_FILES);
    const descriptionFiles = realFiles(formData.getAll("requestDescription")).slice(0, 1);

    const missing = REQUIRED_FIELDS.filter((k) => !fields[k]);
    if (missing.length) {
      return NextResponse.json({ message: `Missing required field(s): ${missing.join(", ")}` }, { status: 400 });
    }

    if (!["drop_request", "whatsapp"].includes(fields.contactPreference)) {
      return NextResponse.json({ message: "contactPreference must be 'drop_request' or 'whatsapp'" }, { status: 400 });
    }
    if (!["pickup", "delivery"].includes(fields.pickupOrDelivery)) {
      return NextResponse.json({ message: "pickupOrDelivery must be 'pickup' or 'delivery'" }, { status: 400 });
    }
    if (fields.pickupOrDelivery === "delivery" && !fields.deliveryAddress) {
      return NextResponse.json({ message: "deliveryAddress is required when delivery is selected" }, { status: 400 });
    }

    const quantity = Number(fields.quantity);
    if (!Number.isInteger(quantity) || quantity < 1) {
      return NextResponse.json({ message: "quantity must be a whole number of 1 or more" }, { status: 400 });
    }

    // Size is optional, but if the customer fills any of it we need all of it.
    let size;
    if (fields.sizeWidth || fields.sizeHeight) {
      const width = Number(fields.sizeWidth);
      const height = Number(fields.sizeHeight);
      if (!(width > 0) || !(height > 0)) {
        return NextResponse.json({ message: "Size needs both a width and a height greater than 0" }, { status: 400 });
      }
      if (!SIZE_UNITS.includes(fields.sizeUnit)) {
        return NextResponse.json({ message: `Size unit must be one of: ${SIZE_UNITS.join(", ")}` }, { status: 400 });
      }
      size = { width, height, unit: fields.sizeUnit };
    }

    const fileError =
      checkFiles(artworkFiles, "Artwork", (f) => ARTWORK_EXTENSIONS.includes(extensionOf(f)), ARTWORK_EXTENSIONS.join(", ")) ||
      checkFiles(inspirationFiles, "End product inspiration", (f) => f.type.startsWith("image/"), "images only") ||
      checkFiles(descriptionFiles, "Request description", (f) => DOCUMENT_EXTENSIONS.includes(extensionOf(f)), DOCUMENT_EXTENSIONS.join(", "));
    if (fileError) {
      return NextResponse.json({ message: fileError }, { status: 400 });
    }

    const normalizedEmail = fields.email.toLowerCase();

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

    const [artwork, endProductInspiration, [requestDescription]] = await Promise.all([
      uploadWebDocuments(artworkFiles, "corps-prints/service-requests/artwork"),
      uploadWebFiles(inspirationFiles, "corps-prints/service-requests/inspiration"),
      uploadWebDocuments(descriptionFiles, "corps-prints/service-requests/documents"),
    ]);

    const serviceRequest = await ServiceRequest.create({
      category: fields.category,
      categorySlug: fields.categorySlug,
      type: fields.type,
      typeSlug: fields.typeSlug,
      name: fields.name,
      company: fields.company,
      email: normalizedEmail,
      phone: fields.phone,
      alternativePhone: fields.alternativePhone,
      gstNo: fields.gstNo,
      size,
      quantity,
      artwork,
      endProductInspiration,
      requestDescription,
      contactPreference: fields.contactPreference,
      pickupOrDelivery: fields.pickupOrDelivery,
      deliveryAddress: fields.pickupOrDelivery === "delivery" ? fields.deliveryAddress : undefined,
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