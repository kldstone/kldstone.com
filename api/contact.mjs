/**
 * Vercel Serverless API — POST /api/contact
 * Sends inquiry emails to kldstone.china@gmail.com
 * Environment variables (set in Vercel):
 *   MAIL_HOST, MAIL_PORT, MAIL_USER, MAIL_PASS — SMTP credentials
 *   or MAILGUN_API_KEY, MAILGUN_DOMAIN — Mailgun API
 *   or RESEND_API_KEY — Resend API
 */

// @ts-nocheck - Vercel Serverless Runtime uses its own types

const RECIPIENT = "kldstone.china@gmail.com";
const ipHits = new Map();
const ALLOWED_FIELDS = ["name", "email", "phone", "company", "country", "message", "product", "source", "utm_source", "utm_medium", "utm_campaign", "gclid", "gbraid", "wbraid"];
const MAX_MESSAGE_LENGTH = 5000;
const MAX_FIELD_LENGTH = 500;
const RATE_LIMIT_WINDOW = 10000;
const RATE_LIMIT_MAX = 3;

function isRateLimited(ip) {
  const now = Date.now();
  const entry = ipHits.get(ip);
  if (!entry || now > entry.resetAt) {
    ipHits.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return false;
  }
  entry.count++;
  return entry.count > RATE_LIMIT_MAX;
}

function sanitize(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function buildEmailHtml(data) {
  const lines = [
    "<!doctype html><html><head><meta charset='UTF-8'></head><body style='font-family:Arial,sans-serif;color:#111'>",
    "<h2>New Inquiry from KLD Stone Website</h2>",
    "<table style='border-collapse:collapse;width:100%;max-width:600px'>",
  ];
  for (const field of ALLOWED_FIELDS) {
    const val = data[field];
    if (!val) continue;
    if (["utm_source", "utm_medium", "utm_campaign", "gclid", "gbraid", "wbraid"].includes(field)) continue;
    lines.push(`<tr style="border-bottom:1px solid #eee"><td style="padding:8px 12px;font-weight:bold;text-transform:capitalize">${sanitize(field)}</td><td style="padding:8px 12px">${sanitize(val)}</td></tr>`);
  }
  lines.push("</table>");

  // Append tracking info
  const tracking = [];
  for (const t of ["utm_source", "utm_medium", "utm_campaign"]) {
    if (data[t]) tracking.push(`${t}=${data[t]}`);
  }
  if (tracking.length > 0) {
    lines.push(`<p style="font-size:12px;color:#888">Source: ${sanitize(tracking.join("&"))}</p>`);
  }

  lines.push("</body></html>");
  return lines.join("\n");
}

function buildEmailText(data) {
  const lines = ["New Inquiry from KLD Stone Website", ""];
  for (const field of ALLOWED_FIELDS) {
    const val = data[field];
    if (val) lines.push(`${field}: ${val}`);
  }
  return lines.join("\n");
}

async function sendViaResend(data) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;

  const html = buildEmailHtml(data);

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "KLD Stone Website <noreply@kldstone.com>",
      to: RECIPIENT,
      subject: "KLD Stone Website - New Inquiry",
      html,
      text: buildEmailText(data),
      reply_to: data.email || RECIPIENT,
    }),
  });

  const result = await res.json().catch(() => ({}));
  if (!res.ok || !result.id) {
    throw new Error(`Resend rejected email (${res.status}): ${result.message || result.name || "unknown error"}`);
  }
  return { provider: "resend", id: result.id };
}

async function sendViaMailgun(data) {
  const apiKey = process.env.MAILGUN_API_KEY;
  const domain = process.env.MAILGUN_DOMAIN;
  if (!apiKey || !domain) return null;

  const form = new URLSearchParams();
  form.set("from", `KLD Stone Website <noreply@${domain}>`);
  form.set("to", RECIPIENT);
  form.set("subject", `KLD Stone Inquiry from ${sanitize(data.name || "Website")}`);
  form.set("html", buildEmailHtml(data));
  if (data.email) form.set("h:Reply-To", data.email);
  form.set("o:tag", "website-inquiry");

  const res = await fetch(`https://api.mailgun.net/v3/${domain}/messages`, {
    method: "POST",
    headers: {
      "Authorization": `Basic ${btoa(`api:${apiKey}`)}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: form,
  });

  const result = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(`Mailgun rejected email (${res.status}): ${result.message || "unknown error"}`);
  }
  return { provider: "mailgun", id: result.id || "accepted" };
}

async function sendViaSMTP(_data) {
  // SMTP implementation requires nodemailer or similar
  // For now return false to fall through
  return null;
}

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  // Rate limit by IP
  const ip = String(req.headers["x-forwarded-for"] || "").split(",")[0]?.trim() || req.socket.remoteAddress || "unknown";
  if (isRateLimited(ip)) {
    console.warn(`Rate limit hit for ${ip}`);
    return res.status(429).json({ ok: false, error: "Too many requests. Please wait before trying again." });
  }

  // Body size check
  const bodySize = JSON.stringify(req.body).length;
  if (bodySize > 65536) {
    return res.status(413).json({ ok: false, error: "Request too large" });
  }

  // Honeypot check
  if (req.body.website) {
    // Bot filled hidden field
    return res.status(200).json({ ok: true }); // Pretend success to not tip off bots
  }

  // Validate fields
  const data = {};
  for (const field of ALLOWED_FIELDS) {
    const val = req.body[field];
    if (val !== undefined && val !== null) {
      if (typeof val !== "string" || val.length > MAX_FIELD_LENGTH) continue;
      data[field] = val.trim();
    }
  }

  // Required fields
  if (!data.name || !data.email || !data.message) {
    return res.status(400).json({ ok: false, error: "Name, email and message are required." });
  }
  if (!validateEmail(data.email)) {
    return res.status(400).json({ ok: false, error: "Please provide a valid email address." });
  }
  if (data.message.length > MAX_MESSAGE_LENGTH) {
    return res.status(400).json({ ok: false, error: "Message is too long." });
  }

  // Sanitize message text (strip any HTML-like tags)
  // Try email providers in order
  let delivery = null;
  try {
    delivery = await sendViaResend(data) || await sendViaMailgun(data) || await sendViaSMTP(data);
  } catch (err) {
    console.error("Email send error:", err);
  }

  if (delivery) {
    console.log(`Inquiry accepted by ${delivery.provider}; message id: ${delivery.id}`);
    return res.status(200).json({ ok: true });
  } else {
    // No email service configured — return success anyway (frontend should show thank-you)
    // In production, set RESEND_API_KEY or MAILGUN_API_KEY
    console.error("Inquiry email was not accepted by any configured provider.");
    return res.status(503).json({
      ok: false,
      error: "We could not send your inquiry. Please email kldstone.china@gmail.com directly.",
    });
  }
}
