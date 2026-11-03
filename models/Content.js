import mongoose from "mongoose";
const { Schema, models, model } = mongoose;

const base = { img: { type: String, default: "" }, publicId: { type: String, default: "" } };
const make = (name, def) =>
  models[name] || model(name, new Schema({ ...def, ...base }, { timestamps: true }));

const Gallery = make("GalleryImage", {
  title: String, tag: String, desc: String,
  pinned: { type: Boolean, default: false },
  pinOrder: { type: Number, default: 0 },
});
const Hero = make("HeroSlide", { word: String, sub: String });
const Testimonial = make("Testimonial", { head: String, quote: String, name: String, role: String });
const Brand = make("Brand", { name: String });

export const RESOURCES = {
  gallery:      { model: Gallery,     fields: ["title", "tag", "desc"], sort: { createdAt: -1 } },
  hero:         { model: Hero,        fields: ["word", "sub"], sort: { createdAt: 1 } },
  testimonials: { model: Testimonial, fields: ["head", "quote", "name", "role"], sort: { createdAt: 1 }, imageOptional: true },
  brands:       { model: Brand,       fields: ["name"], sort: { createdAt: 1 } },
};