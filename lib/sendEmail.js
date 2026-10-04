import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail", // change to a custom SMTP config if not using Gmail
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * @param {string} to
 * @param {string} subject
 * @param {string} html
 */
const sendEmail = async (to, subject, html) => {
  try {
    await transporter.sendMail({
      from: `"Corps Prints" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });
  } catch (err) {
    // Email failure should never crash the submission flow - just log it.
    console.error("Email send failed:", err.message);
  }
};

export default sendEmail;
