"use client";

import { useState } from "react";

const SOLUTIONS = [
  "Flex Printing",
  "Vinyl Printing",
  "UV Printing(with White)",
  "Branding Solutions",
  "Signage & Display Systems",
  "Laser Cutting",
  "CNC Cutting",
];

const emptyCommon = { name: "", company: "", email: "", phone: "", alternativePhone: "" };
const emptyEnquiry = { issueRequest: "" };
const emptyCustom = {
  gstNo: "",
  solutionLookingFor: "",
  size: "",
  quantity: "",
  requestDescription: "",
  dropRequestOrWhatsapp: "",
  pickupOrDelivery: "pickup",
  deliveryAddress: "",
};

// Swap this for a real, licensed photo once you've picked one from Unsplash/Pexels.
// Example: save it as public/backgrounds/hero.jpg and set this to "/backgrounds/hero.jpg"
const HERO_PHOTO_URL = "";

export default function ContactDarkPage() {
  const [type, setType] = useState("enquiry");
  const [common, setCommon] = useState(emptyCommon);
  const [enquiry, setEnquiry] = useState(emptyEnquiry);
  const [custom, setCustom] = useState(emptyCustom);
  const [artwork, setArtwork] = useState([]);
  const [inspiration, setInspiration] = useState([]);
  const [status, setStatus] = useState("idle");
  const [feedback, setFeedback] = useState("");

  const updateCommon = (key) => (e) => setCommon((s) => ({ ...s, [key]: e.target.value }));
  const updateEnquiry = (key) => (e) => setEnquiry((s) => ({ ...s, [key]: e.target.value }));
  const updateCustom = (key) => (e) => setCustom((s) => ({ ...s, [key]: e.target.value }));

  const resetForm = () => {
    setCommon(emptyCommon);
    setEnquiry(emptyEnquiry);
    setCustom(emptyCustom);
    setArtwork([]);
    setInspiration([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setFeedback("");

    const formData = new FormData();
    formData.append("type", type);
    Object.entries(common).forEach(([k, v]) => formData.append(k, v));

    if (type === "enquiry") {
      formData.append("issueRequest", enquiry.issueRequest);
    } else {
      Object.entries(custom).forEach(([k, v]) => formData.append(k, v));
      artwork.forEach((file) => formData.append("artwork", file));
      inspiration.forEach((file) => formData.append("endProductInspiration", file));
    }

    try {
      const res = await fetch("/api/submissions", { method: "POST", body: formData });
      const data = await res.json();

      if (res.status === 201) {
        setStatus("success");
        setFeedback("Thanks — your form is in. We'll reach out shortly.");
        resetForm();
      } else if (res.status === 409) {
        setStatus("duplicate");
        setFeedback(data.message || "You already have a submission of this type in progress.");
      } else {
        setStatus("error");
        setFeedback(data.message || "Something went wrong. Please check the form and try again.");
      }
    } catch (err) {
      setStatus("error");
      setFeedback("Couldn't reach the server. Please try again in a moment.");
    }
  };

  const isCustom = type === "custom_order";

  return (
    <main className="min-h-screen bg-paper p-3 md:p-5">
      <div
        className="min-h-[calc(100vh-1.5rem)] overflow-hidden rounded-[2rem] bg-ink bg-cover bg-center md:min-h-[calc(100vh-2.5rem)]"
        style={{
          backgroundImage: HERO_PHOTO_URL
            ? `linear-gradient(180deg, rgba(20,21,26,0.55), rgba(20,21,26,0.85)), url('${HERO_PHOTO_URL}')`
            : "radial-gradient(1200px 700px at 75% 15%, #22242c 0%, #14151A 60%), linear-gradient(160deg, #1b1c22 0%, #0e0f13 100%)",
        }}
      >
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 py-16 md:grid-cols-2 md:gap-16 md:py-20">
        {/* Left: headline + teaser + footer-style info, white text over the photo */}
        <section className="flex flex-col justify-between animate-rise-in">
          <div>
            <h1 className="font-display text-4xl leading-[1.1] tracking-tight text-white md:text-6xl">
              You have a print job, we have the plates.
            </h1>
            <p className="mt-6 max-w-sm text-base leading-relaxed text-white/70">
              From a single signage panel to a full branding rollout — send us the details
              and we'll come back with a plan, a price, and a timeline.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-8 text-sm">
            <div>
              <h3 className="font-display text-white">Location</h3>
              <p className="mt-2 leading-relaxed text-white/60">
                Corps Prints Facility
                <br />
                Plot 14, Industrial Estate
                <br />
                Hyderabad, Telangana
              </p>
              <p className="mt-3 text-white/60">Mon – Sat | 09:00 – 19:00</p>
            </div>
            <div>
              <h3 className="font-display text-white">Contact</h3>
              <p className="mt-2 leading-relaxed text-white/60">
                hello@corpsprints.com
                <br />
                +91 90000 00000
              </p>
              <div className="mt-3 flex gap-3">
                <span className="h-2 w-2 rounded-full bg-cyan" />
                <span className="h-2 w-2 rounded-full bg-magenta" />
                <span className="h-2 w-2 rounded-full bg-yellow" />
              </div>
            </div>
          </div>
        </section>

        {/* Right: form card - stays light, like the reference's floating white card */}
        <section
          className="relative rounded-3xl border border-white/10 bg-white/95 p-8 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)] backdrop-blur-sm animate-rise-in md:p-10"
          style={{ animationDelay: "120ms", animationFillMode: "backwards" }}
        >
          <div className="mb-6">
            <h2 className="font-display text-2xl text-ink">Tell Us What You Need</h2>
            <p className="mt-1 text-sm text-ink/60">
              Pick the kind of request, and we'll only ask what's relevant.
            </p>
          </div>

          <div className="relative mb-8 grid grid-cols-2 rounded-full border border-ink/10 bg-ink/[0.03] p-1 text-sm font-medium">
            <div
              className="toggle-thumb pointer-events-none absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-full bg-ink shadow-sm"
              style={{ "--thumb-x": isCustom ? "100%" : "0%" }}
            />
            <button
              type="button"
              onClick={() => setType("enquiry")}
              className={`relative z-10 rounded-full px-4 py-2.5 transition-colors duration-300 ${
                !isCustom ? "text-paper" : "text-ink/60 hover:text-ink"
              }`}
            >
              Enquiry
            </button>
            <button
              type="button"
              onClick={() => setType("custom_order")}
              className={`relative z-10 rounded-full px-4 py-2.5 transition-colors duration-300 ${
                isCustom ? "text-paper" : "text-ink/60 hover:text-ink"
              }`}
            >
              Custom Order
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <Field label="First / Full Name" required>
                <input required value={common.name} onChange={updateCommon("name")} className={inputClass} placeholder="Jordan Rivera" />
              </Field>
              <Field label="Company">
                <input value={common.company} onChange={updateCommon("company")} className={inputClass} placeholder="Optional" />
              </Field>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Phone" required>
                <input required value={common.phone} onChange={updateCommon("phone")} className={inputClass} placeholder="+91 9XXXXXXXXX" />
              </Field>
              <Field label="Alternative Phone">
                <input value={common.alternativePhone} onChange={updateCommon("alternativePhone")} className={inputClass} placeholder="Optional" />
              </Field>
            </div>

            <Field label="Email Address" required>
              <input type="email" required value={common.email} onChange={updateCommon("email")} className={inputClass} placeholder="you@example.com" />
            </Field>

            <div key={type} className="space-y-5 animate-field-in">
              {!isCustom ? (
                <Field label="Issue / Request" required>
                  <textarea required rows={4} value={enquiry.issueRequest} onChange={updateEnquiry("issueRequest")} className={inputClass} placeholder="What do you need help with?" />
                </Field>
              ) : (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="GST No.">
                      <input value={custom.gstNo} onChange={updateCustom("gstNo")} className={inputClass} placeholder="Optional" />
                    </Field>
                    <Field label="Solution Looking For" required>
                      <select required value={custom.solutionLookingFor} onChange={updateCustom("solutionLookingFor")} className={inputClass}>
                        <option value="" disabled>Select one</option>
                        {SOLUTIONS.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </Field>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Size">
                      <input value={custom.size} onChange={updateCustom("size")} className={inputClass} placeholder="e.g. 6x4 ft" />
                    </Field>
                    <Field label="Quantity">
                      <input value={custom.quantity} onChange={updateCustom("quantity")} className={inputClass} placeholder="e.g. 10" />
                    </Field>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Artwork">
                      <input type="file" accept="image/*" multiple onChange={(e) => setArtwork(Array.from(e.target.files || []).slice(0, 5))} className={fileInputClass} />
                    </Field>
                    <Field label="End Product Inspiration">
                      <input type="file" accept="image/*" multiple onChange={(e) => setInspiration(Array.from(e.target.files || []).slice(0, 5))} className={fileInputClass} />
                    </Field>
                  </div>

                  <Field label="Request Description">
                    <textarea rows={3} value={custom.requestDescription} onChange={updateCustom("requestDescription")} className={inputClass} placeholder="Anything specific about the finish, material, or use case" />
                  </Field>

                  <Field label="Drop Request / WhatsApp">
                    <input value={custom.dropRequestOrWhatsapp} onChange={updateCustom("dropRequestOrWhatsapp")} className={inputClass} placeholder="A WhatsApp number or link works too" />
                  </Field>

                  <Field label="Pickup or Delivery" required>
                    <div className="flex gap-2">
                      {["pickup", "delivery"].map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => setCustom((s) => ({ ...s, pickupOrDelivery: option }))}
                          className={`flex-1 rounded-xl border px-4 py-2.5 text-sm capitalize transition-colors duration-200 ${
                            custom.pickupOrDelivery === option ? "border-ink bg-ink text-paper" : "border-ink/15 text-ink/70 hover:border-ink/30"
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </Field>

                  {custom.pickupOrDelivery === "delivery" && (
                    <Field label="Delivery Address" required>
                      <textarea required rows={3} value={custom.deliveryAddress} onChange={updateCustom("deliveryAddress")} className={inputClass} placeholder="Full address, including landmark if useful" />
                    </Field>
                  )}
                </>
              )}
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="group relative mt-2 w-full overflow-hidden rounded-full bg-ink py-3.5 text-sm font-medium text-paper transition-transform duration-200 active:scale-[0.99] disabled:opacity-60"
            >
              {status === "loading" ? "Sending…" : "Submit"}
            </button>

            {feedback && (
              <p
                className={`animate-field-in rounded-xl px-4 py-3 text-sm ${
                  status === "success" ? "bg-cyan/10 text-cyan" : status === "duplicate" ? "bg-yellow/10 text-ink" : "bg-magenta/10 text-magenta"
                }`}
              >
                {feedback}
              </p>
            )}
          </form>
        </section>
      </div>
      </div>
    </main>
  );
}

function Field({ label, required, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-ink/60">
        {label}
        {required && <span className="text-magenta"> *</span>}
      </span>
      {children}
    </label>
  );
}

const inputClass =
  "w-full rounded-xl border border-ink/15 bg-white px-4 py-2.5 text-sm text-ink outline-none transition-colors duration-200 placeholder:text-ink/30 focus:border-ink/40 focus:ring-2 focus:ring-cyan/20";

const fileInputClass =
  "w-full rounded-xl border border-dashed border-ink/20 bg-white px-4 py-2.5 text-xs text-ink/60 file:mr-3 file:rounded-full file:border-0 file:bg-ink file:px-3 file:py-1.5 file:text-xs file:text-paper";