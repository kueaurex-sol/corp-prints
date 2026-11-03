import mongoose from "mongoose";

// Read-only view of what the admin panel manages. `strict: false` lets every field through.
const ServiceTypeSchema = new mongoose.Schema(
  { categorySlug: String, slug: String, name: String, order: Number, active: Boolean },
  { strict: false, collection: "servicetypes" }
);

export default mongoose.models.ServiceType || mongoose.model("ServiceType", ServiceTypeSchema);