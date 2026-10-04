"use client";
import { useState } from "react";

const STYLE_OPTIONS = ["Matte", "Glossy", "Textured", "Backlit / Edge-glow", "Not sure yet"];

export default function QuoteForm({ categoryName, categorySlug, typeName, typeSlug }) {
  const [fields, setFields] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    quantity: "",
    dimensions: "",
    style: "",
    message: "",
  });
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [feedback, setFeedback] = useState("");

  const update = (key) => (e) => setFields((s) => ({ ...s, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setFeedback("");

    const formData = new FormData();
    formData.append("category", categoryName);
    formData.append("categorySlug", categorySlug);
    formData.append("type", typeName);
    formData.append("typeSlug", typeSlug);
    Object.entries(fields).forEach(([k, v]) => formData.append(k, v));
    images.forEach((file) => formData.append("images", file));

    try {
      const res = await fetch("/api/service-requests", { method: "POST", body: formData });
      const data = await res.json();

      if (res.status === 201) {
        setStatus("success");
        setFeedback("Request sent — check your email for confirmation. We'll follow up shortly.");
        setFields({ name: "", email: "", phone: "", address: "", quantity: "", dimensions: "", style: "", message: "" });
        setImages([]);
      } else if (res.status === 409) {
        setStatus("duplicate");
        setFeedback(data.message || "You already have this request in progress.");
      } else {
        setStatus("error");
        setFeedback(data.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setStatus("error");
      setFeedback("Couldn't reach the server. Please try again in a moment.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-5 rounded-[1.75rem] border border-ink/10 bg-white/70 p-6 md:p-8">
      <h3 className="font-display text-xl text-ink">Request a quote</h3>
      <p className="text-sm text-ink/60">Tell us the specs — we'll come back with pricing and a timeline.</p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Full name" required>
          <input required value={fields.name} onChange={update("name")} className={inputClass} placeholder="Jordan Rivera" />
        </Field>
        <Field label="Phone" required>
          <input required value={fields.phone} onChange={update("phone")} className={inputClass} placeholder="+91 9XXXXXXXXX" />
        </Field>
      </div>

      <Field label="Email" required>
        <input type="email" required value={fields.email} onChange={update("email")} className={inputClass} placeholder="you@example.com" />
      </Field>

      <Field label="Delivery / site address" required>
        <textarea required rows={2} value={fields.address} onChange={update("address")} className={textareaClass} placeholder="Full address, with landmark if useful" />
      </Field>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Quantity" required>
          <input required value={fields.quantity} onChange={update("quantity")} className={inputClass} placeholder="e.g. 10" />
        </Field>
        <Field label="Dimensions">
          <input value={fields.dimensions} onChange={update("dimensions")} className={inputClass} placeholder="e.g. 6ft x 4ft" />
        </Field>
      </div>

      <Field label="Style / finish">
        <select value={fields.style} onChange={update("style")} className={inputClass}>
          <option value="">Select one</option>
          {STYLE_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      </Field>

      <Field label="Reference images">
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => setImages(Array.from(e.target.files || []).slice(0, 5))}
          className={fileInputClass}
        />
      </Field>

      <Field label="Anything else?">
        <textarea rows={3} value={fields.message} onChange={update("message")} className={textareaClass} placeholder="Material preference, timeline, use case..." />
      </Field>

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-full bg-ink py-3.5 text-sm font-medium text-paper transition-transform active:scale-[0.99] disabled:opacity-60"
      >
        {status === "loading" ? "Sending…" : "Submit request"}
      </button>

      {feedback && (
        <p
          className={`rounded-xl px-4 py-3 text-sm ${
            status === "success" ? "bg-cyan/10 text-cyan" : status === "duplicate" ? "bg-yellow/15 text-ink" : "bg-magenta/10 text-magenta"
          }`}
        >
          {feedback}
        </p>
      )}
    </form>
  );
}

function Field({ label, required, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-ink/60">
        {label}{required && <span className="text-magenta"> *</span>}
      </span>
      {children}
    </label>
  );
}

const inputClass =
  "w-full rounded-xl border border-ink/15 bg-white px-4 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-ink/30 focus:border-cyan focus:ring-2 focus:ring-cyan/20";
const textareaClass = inputClass;
const fileInputClass =
  "w-full rounded-xl border border-dashed border-ink/20 bg-white px-4 py-2.5 text-xs text-ink/60 file:mr-3 file:rounded-full file:border-0 file:bg-ink file:px-3 file:py-1.5 file:text-xs file:text-paper";