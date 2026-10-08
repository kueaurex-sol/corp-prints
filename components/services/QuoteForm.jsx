// "use client";
// import { useState } from "react";

// const STYLE_OPTIONS = [
//   "Matte",
//   "Glossy",
//   "Textured",
//   "Backlit / Edge-glow",
//   "Not sure yet",
// ];

// export default function QuoteForm({
//   categoryName,
//   categorySlug,
//   typeName,
//   typeSlug,
// }) {
//   const [fields, setFields] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     address: "",
//     quantity: "",
//     dimensions: "",
//     style: "",
//     message: "",
//   });
//   const [images, setImages] = useState([]);
//   const [status, setStatus] = useState("idle"); // idle | loading | success | error
//   const [feedback, setFeedback] = useState("");

//   const update = (key) => (e) =>
//     setFields((s) => ({ ...s, [key]: e.target.value }));

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setStatus("loading");
//     setFeedback("");

//     const formData = new FormData();
//     formData.append("category", categoryName);
//     formData.append("categorySlug", categorySlug);
//     formData.append("type", typeName);
//     formData.append("typeSlug", typeSlug);
//     Object.entries(fields).forEach(([k, v]) => formData.append(k, v));
//     images.forEach((file) => formData.append("images", file));

//     try {
//       const res = await fetch("/api/service-requests", {
//         method: "POST",
//         body: formData,
//       });
//       const data = await res.json();

//       if (res.status === 201) {
//         setStatus("success");
//         setFeedback(
//           "Request sent — check your email for confirmation. We'll follow up shortly.",
//         );
//         setFields({
//           name: "",
//           email: "",
//           phone: "",
//           address: "",
//           quantity: "",
//           dimensions: "",
//           style: "",
//           message: "",
//         });
//         setImages([]);
//       } else if (res.status === 409) {
//         setStatus("duplicate");
//         setFeedback(
//           data.message || "You already have this request in progress.",
//         );
//       } else {
//         setStatus("error");
//         setFeedback(data.message || "Something went wrong. Please try again.");
//       }
//     } catch (err) {
//       setStatus("error");
//       setFeedback("Couldn't reach the server. Please try again in a moment.");
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="mt-8 space-y-5 rounded-[1.75rem] border border-ink/10 bg-white/70 p-6 md:p-8"
//     >
//       <h3 className="font-display text-xl text-ink">Request a quote</h3>
//       <p className="text-sm text-ink/60">
//         Tell us the specs — we'll come back with pricing and a timeline.
//       </p>

//       <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//         <Field label="Full name" required>
//           <input
//             required
//             value={fields.name}
//             onChange={update("name")}
//             className={inputClass}
//             placeholder="Jordan Rivera"
//           />
//         </Field>
//         <Field label="Phone" required>
//           <input
//             required
//             value={fields.phone}
//             onChange={update("phone")}
//             className={inputClass}
//             placeholder="+91 9XXXXXXXXX"
//           />
//         </Field>
//       </div>

//       <Field label="Email" required>
//         <input
//           type="email"
//           required
//           value={fields.email}
//           onChange={update("email")}
//           className={inputClass}
//           placeholder="you@example.com"
//         />
//       </Field>

//       <Field label="Delivery / site address" required>
//         <textarea
//           required
//           rows={2}
//           value={fields.address}
//           onChange={update("address")}
//           className={textareaClass}
//           placeholder="Full address, with landmark if useful"
//         />
//       </Field>

//       <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//         <Field label="Quantity" required>
//           <input
//             required
//             value={fields.quantity}
//             onChange={update("quantity")}
//             className={inputClass}
//             placeholder="e.g. 10"
//           />
//         </Field>
//         <Field label="Dimensions">
//           <input
//             value={fields.dimensions}
//             onChange={update("dimensions")}
//             className={inputClass}
//             placeholder="e.g. 6ft x 4ft"
//           />
//         </Field>
//       </div>

//       <Field label="Style / finish">
//         <select
//           value={fields.style}
//           onChange={update("style")}
//           className={inputClass}
//         >
//           <option value="">Select one</option>
//           {STYLE_OPTIONS.map((o) => (
//             <option key={o} value={o}>
//               {o}
//             </option>
//           ))}
//         </select>
//       </Field>

//       <Field label="Reference images">
//         <input
//           type="file"
//           accept="image/*"
//           multiple
//           onChange={(e) =>
//             setImages(Array.from(e.target.files || []).slice(0, 5))
//           }
//           className={fileInputClass}
//         />
//       </Field>

//       <Field label="Anything else?">
//         <textarea
//           rows={3}
//           value={fields.message}
//           onChange={update("message")}
//           className={textareaClass}
//           placeholder="Material preference, timeline, use case..."
//         />
//       </Field>

//       <button
//         type="submit"
//         disabled={status === "loading"}
//         className="w-full rounded-full bg-ink py-3.5 text-sm font-medium text-paper transition-transform active:scale-[0.99] disabled:opacity-60"
//       >
//         {status === "loading" ? "Sending…" : "Submit request"}
//       </button>

//       {feedback && (
//         <p
//           className={`rounded-xl px-4 py-3 text-sm ${
//             status === "success"
//               ? "bg-cyan/10 text-cyan"
//               : status === "duplicate"
//                 ? "bg-yellow/15 text-ink"
//                 : "bg-magenta/10 text-magenta"
//           }`}
//         >
//           {feedback}
//         </p>
//       )}
//     </form>
//   );
// }

// function Field({ label, required, children }) {
//   return (
//     <label className="block">
//       <span className="mb-1.5 block text-xs font-medium text-ink/60">
//         {label}
//         {required && <span className="text-magenta"> *</span>}
//       </span>
//       {children}
//     </label>
//   );
// }

// const inputClass =
//   "w-full rounded-xl border border-ink/15 bg-white px-4 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-ink/30 focus:border-cyan focus:ring-2 focus:ring-cyan/20";
// const textareaClass = inputClass;
// const fileInputClass =
//   "w-full rounded-xl border border-dashed border-ink/20 bg-white px-4 py-2.5 text-xs text-ink/60 file:mr-3 file:rounded-full file:border-0 file:bg-ink file:px-3 file:py-1.5 file:text-xs file:text-paper";

"use client";
import { useState } from "react";

// Shown to the customer when they choose "Pickup". Replace with the real store address.
const STORE_ADDRESS = "Corps Prints, [store address goes here]";

const SIZE_UNITS = ["mm", "cm", "in", "ft", "m"];

const CONTACT_OPTIONS = [
  { value: "drop_request", label: "Drop request" },
  { value: "whatsapp", label: "Chat on WhatsApp" },
];

const DELIVERY_OPTIONS = [
  { value: "pickup", label: "Pickup" },
  { value: "delivery", label: "Delivery" },
];

const emptyFields = {
  name: "",
  company: "",
  email: "",
  phone: "",
  alternativePhone: "",
  gstNo: "",
  sizeWidth: "",
  sizeHeight: "",
  sizeUnit: "ft",
  quantity: "",
  contactPreference: "drop_request",
  pickupOrDelivery: "pickup",
  deliveryAddress: "",
};

export default function QuoteForm({ categoryName, categorySlug, typeName, typeSlug }) {
  const [fields, setFields] = useState(emptyFields);
  const [artwork, setArtwork] = useState([]);
  const [inspiration, setInspiration] = useState([]);
  const [description, setDescription] = useState(null);
  const [fileKey, setFileKey] = useState(0); // bumping this clears the file inputs after a successful submit
  const [status, setStatus] = useState("idle"); // idle | loading | success | duplicate | error
  const [feedback, setFeedback] = useState("");

  const update = (key) => (e) => setFields((s) => ({ ...s, [key]: e.target.value }));
  const choose = (key) => (value) => setFields((s) => ({ ...s, [key]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setFeedback("");

    const formData = new FormData();
    formData.append("category", categoryName);
    formData.append("categorySlug", categorySlug);
    formData.append("type", typeName);
    formData.append("typeSlug", typeSlug);
    Object.entries(fields).forEach(([k, v]) => {
      // For pickup the store address is shown instead, so there's no address to send.
      if (k === "deliveryAddress" && fields.pickupOrDelivery !== "delivery") return;
      formData.append(k, v);
    });
    artwork.forEach((file) => formData.append("artwork", file));
    inspiration.forEach((file) => formData.append("endProductInspiration", file));
    if (description) formData.append("requestDescription", description);

    try {
      const res = await fetch("/api/service-requests", { method: "POST", body: formData });
      const data = await res.json();

      if (res.status === 201) {
        setStatus("success");
        setFeedback("Request sent — check your email for confirmation. We'll follow up shortly.");
        setFields(emptyFields);
        setArtwork([]);
        setInspiration([]);
        setDescription(null);
        setFileKey((k) => k + 1);
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

      {/* Personal details */}
      <h4 className="pt-2 font-display text-sm text-ink">Personal details</h4>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Name" required>
          <input required value={fields.name} onChange={update("name")} className={inputClass} placeholder="Jordan Rivera" />
        </Field>
        <Field label="Company">
          <input value={fields.company} onChange={update("company")} className={inputClass} placeholder="Optional" />
        </Field>
        <Field label="Phone number" required>
          <input required value={fields.phone} onChange={update("phone")} className={inputClass} placeholder="+91 9XXXXXXXXX" />
        </Field>
        <Field label="Alternative phone number">
          <input value={fields.alternativePhone} onChange={update("alternativePhone")} className={inputClass} placeholder="Optional" />
        </Field>
        <Field label="Email" required>
          <input type="email" required value={fields.email} onChange={update("email")} className={inputClass} placeholder="you@example.com" />
        </Field>
        <Field label="GST no.">
          <input value={fields.gstNo} onChange={update("gstNo")} className={inputClass} placeholder="Optional" />
        </Field>
      </div>

      {/* Custom order request */}
      <h4 className="pt-2 font-display text-sm text-ink">Order details</h4>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Field label="Width">
          <input type="number" min="0" step="any" inputMode="decimal" value={fields.sizeWidth} onChange={update("sizeWidth")} className={inputClass} placeholder="e.g. 6" />
        </Field>
        <Field label="Height">
          <input type="number" min="0" step="any" inputMode="decimal" value={fields.sizeHeight} onChange={update("sizeHeight")} className={inputClass} placeholder="e.g. 4" />
        </Field>
        <Field label="Unit">
          <select value={fields.sizeUnit} onChange={update("sizeUnit")} className={inputClass}>
            {SIZE_UNITS.map((u) => <option key={u} value={u}>{u}</option>)}
          </select>
        </Field>
      </div>

      <Field label="Quantity" required>
        <input type="number" required min="1" step="1" inputMode="numeric" value={fields.quantity} onChange={update("quantity")} className={inputClass} placeholder="e.g. 10" />
      </Field>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Artwork" hint="PDF, AI, PSD, CDR, EPS, SVG, PNG, JPG, TIFF · up to 5 files, 10 MB each">
          <input
            key={`artwork-${fileKey}`}
            type="file"
            accept=".pdf,.ai,.psd,.cdr,.eps,.svg,.png,.jpg,.jpeg,.tif,.tiff"
            multiple
            onChange={(e) => setArtwork(Array.from(e.target.files || []).slice(0, 5))}
            className={fileInputClass}
          />
        </Field>
        <Field label="End product inspiration" hint="Images · up to 5 files, 10 MB each">
          <input
            key={`inspiration-${fileKey}`}
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => setInspiration(Array.from(e.target.files || []).slice(0, 5))}
            className={fileInputClass}
          />
        </Field>
      </div>

      <Field label="Request description" hint="Upload a document: PDF, DOC, DOCX, TXT, RTF, ODT · 10 MB max">
        <input
          key={`description-${fileKey}`}
          type="file"
          accept=".pdf,.doc,.docx,.txt,.rtf,.odt"
          onChange={(e) => setDescription(e.target.files?.[0] || null)}
          className={fileInputClass}
        />
      </Field>

      <FieldGroup label="Drop request or communicate on WhatsApp" required>
        <ChoiceButtons options={CONTACT_OPTIONS} value={fields.contactPreference} onChange={choose("contactPreference")} />
      </FieldGroup>

      {/* Delivery details */}
      <h4 className="pt-2 font-display text-sm text-ink">Delivery details</h4>
      <FieldGroup label="Pickup or delivery" required>
        <ChoiceButtons options={DELIVERY_OPTIONS} value={fields.pickupOrDelivery} onChange={choose("pickupOrDelivery")} />
      </FieldGroup>

      <div key={fields.pickupOrDelivery} className="animate-field-in">
        {fields.pickupOrDelivery === "delivery" ? (
          <Field label="Delivery address" required>
            <textarea
              required
              rows={3}
              value={fields.deliveryAddress}
              onChange={update("deliveryAddress")}
              className={inputClass}
              placeholder="Full address, with landmark if useful"
            />
          </Field>
        ) : (
          <div className="rounded-xl border border-ink/10 bg-ink/[0.03] px-4 py-3">
            <p className="text-xs font-medium text-ink/60">Pick up from our store</p>
            <p className="mt-1 text-sm text-ink">{STORE_ADDRESS}</p>
          </div>
        )}
      </div>

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

function Field({ label, required, hint, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-ink/60">
        {label}{required && <span className="text-magenta"> *</span>}
      </span>
      {children}
      {hint && <span className="mt-1 block text-[11px] text-ink/40">{hint}</span>}
    </label>
  );
}

// For button groups. A <label> would forward clicks on its text or gaps to the first button.
function FieldGroup({ label, required, children }) {
  return (
    <div role="group" aria-label={label}>
      <span className="mb-1.5 block text-xs font-medium text-ink/60">
        {label}{required && <span className="text-magenta"> *</span>}
      </span>
      {children}
    </div>
  );
}

function ChoiceButtons({ options, value, onChange }) {
  return (
    <div className="flex gap-2">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          aria-pressed={value === o.value}
          onClick={() => onChange(o.value)}
          className={`flex-1 rounded-xl border px-4 py-2.5 text-sm transition-colors duration-200 ${
            value === o.value ? "border-ink bg-ink text-paper" : "border-ink/15 text-ink/70 hover:border-ink/30"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

const inputClass =
  "w-full rounded-xl border border-ink/15 bg-white px-4 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-ink/30 focus:border-cyan focus:ring-2 focus:ring-cyan/20";
const fileInputClass =
  "w-full rounded-xl border border-dashed border-ink/20 bg-white px-4 py-2.5 text-xs text-ink/60 file:mr-3 file:rounded-full file:border-0 file:bg-ink file:px-3 file:py-1.5 file:text-xs file:text-paper";