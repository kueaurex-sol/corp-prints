import mongoose from "mongoose";
import { SIZE_UNITS } from "@/lib/sizeUnits";

export const SOLUTION_OPTIONS = [
  "Flex Printing",
  "Vinyl Printing",
  "UV Printing(with White)",
  "Branding Solutions",
  "Signage & Display Systems",
  "Laser Cutting",
  "CNC Cutting",
];

const ImageSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    publicId: { type: String, required: true },
  },
  { _id: false }
);

const SubmissionSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["enquiry", "custom_order"],
      required: true,
    },

    status: {
      type: String,
      enum: ["requested", "in process", "completed"],
      default: "requested",
    },

    // Top-level fields, always populated (used for duplicate lookup by email)
    name: { type: String, required: true, trim: true },
    company: { type: String, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true, index: true },
    phone: { type: String, required: true, trim: true },
    alternativePhone: { type: String, trim: true },

    // --- Enquiry-only field ---
    issueRequest: {
      type: String,
      required: function () {
        return this.type === "enquiry";
      },
    },

    // --- Custom Order fields ---
    gstNo: { type: String, trim: true }, // personal details

    customOrderRequest: {
      solutionLookingFor: {
        type: String,
        enum: SOLUTION_OPTIONS,
        required: function () {
          return this.type === "custom_order";
        },
      },
           size: { type: String }, // readable label, e.g. "6 x 4 ft"
      sizeWidth: { type: Number, min: 0 },
      sizeHeight: { type: Number, min: 0 },
      sizeUnit: { type: String, enum: SIZE_UNITS },
      quantity: { type: String },
      artwork: [ImageSchema], // uploaded images
      endProductInspiration: [ImageSchema], // uploaded images
      requestDescription: { type: String },
      dropRequestOrWhatsapp: { type: String }, // "Drop Request or communication with whatsapp"
    },

    deliveryDetails: {
      pickupOrDelivery: {
        type: String,
        enum: ["pickup", "delivery"],
        required: function () {
          return this.type === "custom_order";
        },
      },
      deliveryAddress: {
        type: String,
        required: function () {
          return this.type === "custom_order" && this.deliveryDetails?.pickupOrDelivery === "delivery";
        },
      },
    },
  },
  { timestamps: true }
);

// Prevents "Cannot overwrite model" errors from Next.js dev hot-reloading.
export default mongoose.models.Submission || mongoose.model("Submission", SubmissionSchema);
