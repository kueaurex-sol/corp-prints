// --- Append these to your existing lib/emailTemplates.js ---
// (shown here as a separate file so your enquiry/custom-order templates
// above are left untouched; copy these two exports in alongside them,
// reusing the same `wrapper` and `row`/`imagesRow` helpers already defined
// in that file)

export const serviceRequestConfirmationTemplate = (name, typeName) =>
  wrapper(`
    <p>Hi ${name},</p>
    <p>Thank you for your quote request for <strong>${typeName}</strong> with <strong>Corps Prints</strong>!
    We've received your details and our team will follow up shortly with pricing and a timeline.</p>
    <p>Warm regards,<br/>Team Corps Prints</p>
  `);

export const serviceRequestClientNotificationTemplate = (req) => {
  const imagesHtml = imagesRow("Reference Images", req.images);

  return wrapper(`
    <p><strong>New service quote request</strong></p>
    <table style="border-collapse:collapse;font-size:14px;">
      ${row("Service", `${req.type} (${req.category})`)}
      ${row("Name", req.name)}
      ${row("Email", req.email)}
      ${row("Phone", req.phone)}
      ${row("Address", req.address)}
      ${row("Quantity", req.quantity)}
      ${row("Dimensions", req.dimensions)}
      ${row("Style", req.style)}
      ${row("Message", req.message)}
      ${imagesHtml}
    </table>
    <p style="margin-top:16px;">Status: <strong>${req.status}</strong></p>
  `);
};