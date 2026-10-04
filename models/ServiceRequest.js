import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    publicId: { type: String, required: true },
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

    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },

    quantity: { type: String, trim: true },
    dimensions: { type: String, trim: true },
    style: { type: String, trim: true },
    message: { type: String, trim: true },

    images: [ImageSchema],
  },
  { timestamps: true }
);

// Speeds up the "does this email already have an active request for this
// exact service type" check that runs on every submission.
ServiceRequestSchema.index({ email: 1, typeSlug: 1, status: 1 });

export default mongoose.models.ServiceRequest || mongoose.model("ServiceRequest", ServiceRequestSchema);