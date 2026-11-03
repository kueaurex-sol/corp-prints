import mongoose from "mongoose";

// Read-only view of what the admin panel manages. `strict: false` lets every field through.
const ServiceCategorySchema = new mongoose.Schema(
  { name: String, slug: String, order: Number, active: Boolean },
  { strict: false, collection: "servicecategories" }
);

export default mongoose.models.ServiceCategory || mongoose.model("ServiceCategory", ServiceCategorySchema);