import { cache } from "react";
import connectDB from "@/lib/mongodb";
import ServiceCategory from "@/models/ServiceCategory";
import ServiceType from "@/models/ServiceType";

// Same shape the old data/services.js had, plus images and pricing.
// Hidden categories and hidden services (switched off in the admin panel) are left out.
const plainType = (t) => ({
  slug: t.slug,
  name: t.name,
  description: t.description || "",
  images: (t.images || []).map((i) => i.url),
  pricing: (t.pricing || []).map((p) => ({ label: p.label || "", amount: p.amount, unit: p.unit || "" })),
  priceNote: t.priceNote || "",
});

// cache() means a page that asks for the same thing twice (metadata + page) only hits the database once.
export const getServices = cache(async () => {
  await connectDB();
  const [categories, types] = await Promise.all([
    ServiceCategory.find({ active: { $ne: false } }).sort({ order: 1, createdAt: 1 }).lean(),
    ServiceType.find({ active: { $ne: false } }).sort({ order: 1, createdAt: 1 }).lean(),
  ]);

  return categories.map((c) => ({
    slug: c.slug,
    name: c.name,
    types: types.filter((t) => t.categorySlug === c.slug).map(plainType),
  }));
});

export const getCategory = cache(async (slug) => (await getServices()).find((c) => c.slug === slug) || null);

export const getType = cache(async (categorySlug, typeSlug) => {
  const category = await getCategory(categorySlug);
  if (!category) return null;
  const type = category.types.find((t) => t.slug === typeSlug);
  return type ? { ...type, category } : null;
});