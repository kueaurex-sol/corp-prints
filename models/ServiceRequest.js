// import mongoose from "mongoose";

// const ImageSchema = new mongoose.Schema(
//   {
//     url: { type: String, required: true },
//     publicId: { type: String, required: true },
//   },
//   { _id: false }
// );

// const ServiceRequestSchema = new mongoose.Schema(
//   {
//     status: {
//       type: String,
//       enum: ["requested", "in process", "completed"],
//       default: "requested",
//     },

//     category: { type: String, required: true },
//     categorySlug: { type: String, required: true },
//     type: { type: String, required: true },
//     // Indexed together with email below for the duplicate-request lookup.
//     typeSlug: { type: String, required: true },

//     name: { type: String, required: true, trim: true },
//     email: { type: String, required: true, trim: true, lowercase: true },
//     phone: { type: String, required: true, trim: true },
//     address: { type: String, required: true, trim: true },

//     quantity: { type: String, trim: true },
//     dimensions: { type: String, trim: true },
//     style: { type: String, trim: true },
//     message: { type: String, trim: true },

//     images: [ImageSchema],
//   },
//   { timestamps: true }
// );

// // Speeds up the "does this email already have an active request for this
// // exact service type" check that runs on every submission.
// ServiceRequestSchema.index({ email: 1, typeSlug: 1, status: 1 });

// export default mongoose.models.ServiceRequest || mongoose.model("ServiceRequest", ServiceRequestSchema);
import mongoose from "mongoose";

export const SIZE_UNITS = ["mm", "cm", "in", "ft", "m"];

const ImageSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    publicId: { type: String, required: true },
  },
  { _id: false }
);

// For artwork and the request-description document. Keeps the original file
// name so the team sees "logo-final.ai" instead of a random Cloudinary id.
const FileSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    publicId: { type: String, required: true },
    originalName: { type: String },
  },
  { _id: false }
);

const ServiceRequestSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: ["requested", "in process", "completed"],
      default: "requested",
    },

    category: { type: String, required: true },
    categorySlug: { type: String, required: true },
    type: { type: String, required: true },
    // Indexed together with email below for the duplicate-request lookup.
    typeSlug: { type: String, required: true },

    // --- Personal details ---
    name: { type: String, required: true, trim: true },
    company: { type: String, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    alternativePhone: { type: String, trim: true },
    gstNo: { type: String, trim: true },

    // --- Custom order request ---
    size: {
      width: { type: Number, min: 0 },
      height: { type: Number, min: 0 },
      unit: { type: String, enum: SIZE_UNITS }, // customer picks the metric
    },
    quantity: { type: Number, required: true, min: 1 },
    artwork: [FileSchema], // design files: pdf, ai, psd, cdr, eps, svg, png, jpg, tiff
    endProductInspiration: [ImageSchema], // images
    requestDescription: FileSchema, // a single document file (pdf, doc, docx, ...)
    contactPreference: {
      type: String,
      enum: ["drop_request", "whatsapp"],
      required: true,
    },

    // --- Delivery details ---
    pickupOrDelivery: {
      type: String,
      enum: ["pickup", "delivery"],
      required: true,
    },
    // Only needed for delivery. For pickup the store address is shown instead.
    deliveryAddress: {
      type: String,
      trim: true,
      required: function () {
        return this.pickupOrDelivery === "delivery";
      },
    },
  },
  { timestamps: true }
);

// Speeds up the "does this email already have an active request for this
// exact service type" check that runs on every submission.
ServiceRequestSchema.index({ email: 1, typeSlug: 1, status: 1 });

export default mongoose.models.ServiceRequest || mongoose.model("ServiceRequest", ServiceRequestSchema);