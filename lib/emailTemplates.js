const wrapper = (bodyHtml) => `
  <div style="font-family: Arial, sans-serif; max-width: 560px; margin: auto; padding: 24px; border: 1px solid #eee; border-radius: 8px;">
    <h2 style="color: #1a1a1a;">Corps Prints</h2>
    ${bodyHtml}
    <hr style="margin-top: 24px; border: none; border-top: 1px solid #eee;" />
    <p style="font-size: 12px; color: #888;">This is an automated confirmation email. Please do not reply directly to this email.</p>
  </div>
`;

export const enquiryConfirmationTemplate = (name) =>
  wrapper(`
    <p>Hi ${name},</p>
    <p>Thank you for reaching out to <strong>Corps Prints</strong>! We've received your enquiry and our team will get back to you shortly.</p>
    <p>We appreciate your interest and look forward to assisting you.</p>
    <p>Warm regards,<br/>Team Corps Prints</p>
  `);

export const customOrderConfirmationTemplate = (name) =>
  wrapper(`
    <p>Hi ${name},</p>
    <p>Thank you for submitting your custom order request with <strong>Corps Prints</strong>! Your form has been received successfully.</p>
    <p>Our team will review the details and reach out to you soon regarding the next steps.</p>
    <p>Warm regards,<br/>Team Corps Prints</p>
  `);

// --- Internal notification sent to the client/business inbox on every new submission ---

const row = (label, value) =>
  value
    ? `<tr><td style="padding:4px 12px 4px 0;color:#555;white-space:nowrap;vertical-align:top;"><strong>${label}</strong></td><td style="padding:4px 0;">${value}</td></tr>`
    : "";

const imagesRow = (label, images) => {
  if (!images || images.length === 0) return "";
  const links = images
    .map((img, i) => `<a href="${img.url}" target="_blank">Image ${i + 1}</a>`)
    .join(" &nbsp;|&nbsp; ");
  return row(label, links);
};

export const clientNotificationTemplate = (submission) => {
  const isEnquiry = submission.type === "enquiry";

  const commonRows = `
    ${row("Name", submission.name)}
    ${row("Company", submission.company)}
    ${row("Email", submission.email)}
    ${row("Phone", submission.phone)}
    ${row("Alt. Phone", submission.alternativePhone)}
  `;

  const typeSpecificRows = isEnquiry
    ? `${row("Issue / Request", submission.issueRequest)}`
    : `
      ${row("GST No.", submission.gstNo)}
      ${row("Solution Looking For", submission.customOrderRequest?.solutionLookingFor)}
      ${row("Size", submission.customOrderRequest?.size)}
      ${row("Quantity", submission.customOrderRequest?.quantity)}
      ${imagesRow("Artwork", submission.customOrderRequest?.artwork)}
      ${imagesRow("End Product Inspiration", submission.customOrderRequest?.endProductInspiration)}
      ${row("Request Description", submission.customOrderRequest?.requestDescription)}
      ${row("Drop Request / WhatsApp", submission.customOrderRequest?.dropRequestOrWhatsapp)}
      ${row("Pickup or Delivery", submission.deliveryDetails?.pickupOrDelivery)}
      ${row("Delivery Address", submission.deliveryDetails?.deliveryAddress)}
    `;

  return wrapper(`
    <p><strong>New ${isEnquiry ? "Enquiry" : "Custom Order"} submitted</strong></p>
    <table style="border-collapse:collapse;font-size:14px;">
      ${commonRows}
      ${typeSpecificRows}
    </table>
    <p style="margin-top:16px;">Status: <strong>${submission.status}</strong></p>
  `);
};
