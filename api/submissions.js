import nodemailer from "nodemailer";

const businessEmails = ["rutanvini@gmail.com", "rutvisolanki2@gmail.com"];
const senderName = "Rutanvini Beauty Care";
let transporter;

function getTransporter() {
  const gmailUser = process.env.GMAIL_USER?.trim();
  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD?.replace(/\s/g, "");

  if (!gmailUser || !gmailAppPassword) {
    throw new Error("GMAIL_USER and GMAIL_APP_PASSWORD are not configured.");
  }

  transporter ??= nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: gmailUser,
      pass: gmailAppPassword,
    },
  });

  return { transporter, gmailUser };
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[character];
  });
}

export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ error: "Method not allowed." });
  }

  const { name, email, phone, whatsapp, city, instagram } = request.body ?? {};
  const requiredValues = { name, email, phone, whatsapp, city };
  const hasInvalidRequiredField = Object.values(requiredValues).some(
    (value) => typeof value !== "string" || !value.trim(),
  );

  if (hasInvalidRequiredField) {
    return response.status(400).json({
      error: "Please provide your name, email, phone, WhatsApp number, and city.",
    });
  }

  if (
    name.trim().length > 120 ||
    email.trim().length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) ||
    phone.trim().length > 32 ||
    whatsapp.trim().length > 32 ||
    city.trim().length > 100 ||
    (instagram !== undefined &&
      (typeof instagram !== "string" || instagram.trim().length > 40))
  ) {
    return response.status(400).json({
      error: "Please check your email address and field lengths.",
    });
  }

  const details = {
    Name: name.trim(),
    Email: email.trim(),
    "Phone number": phone.trim(),
    "WhatsApp number": whatsapp.trim(),
    City: city.trim(),
    "Instagram ID":
      typeof instagram === "string" && instagram.trim()
        ? instagram.trim()
        : "Not provided",
  };
  const textDetails = Object.entries(details)
    .map(([label, value]) => `${label}: ${value}`)
    .join("\n");
  const htmlDetails = Object.entries(details)
    .map(
      ([label, value]) =>
        `<tr><th align="left">${escapeHtml(label)}</th><td>${escapeHtml(value)}</td></tr>`,
    )
    .join("");

  try {
    const mail = getTransporter();
    const sender = { name: senderName, address: mail.gmailUser };

    await Promise.all([
      mail.transporter.sendMail({
        from: sender,
        to: businessEmails,
        replyTo: email.trim(),
        subject: `New beauty care enquiry from ${name.trim()}`,
        text: `A new form was submitted:\n\n${textDetails}`,
        html: `<h2>New beauty care enquiry</h2><table cellpadding="8" cellspacing="0">${htmlDetails}</table>`,
      }),
      mail.transporter.sendMail({
        from: sender,
        to: email.trim(),
        subject: "We received your enquiry | Rutanvini Beauty Care",
        text: `Hi ${name.trim()},\n\nThank you for getting in touch with Rutanvini Beauty Care. We received your details and will connect with you soon.\n\nWarmly,\nRutanvini Beauty Care`,
        html: `<p>Hi ${escapeHtml(name.trim())},</p><p>Thank you for getting in touch with Rutanvini Beauty Care. We received your details and will connect with you soon.</p><p>Warmly,<br>Rutanvini Beauty Care</p>`,
      }),
    ]);

    return response.status(200).json({ success: true });
  } catch (error) {
    console.error("Failed to send beauty care submission emails:", {
      code: error.code,
      responseCode: error.responseCode,
      command: error.command,
      message: error.message,
    });
    return response.status(500).json({
      error:
        error.responseCode === 535
          ? "Email setup was rejected by Gmail. Check the Vercel email environment variables."
          : "We couldn't send your emails. Check the server logs and try again.",
    });
  }
}
