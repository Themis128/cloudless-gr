import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

// ---------------------------------------------------------------------------
// Singleton SES client — warm across Lambda invocations (module-level cache)
// ---------------------------------------------------------------------------
let _sesClient: SESClient | null = null;

function getSESClient(): SESClient {
  if (!_sesClient) {
    _sesClient = new SESClient({
      region: process.env.AWS_SES_REGION ?? process.env.SES_REGION ?? "eu-west-1",
    });
  }
  return _sesClient;
}

// ---------------------------------------------------------------------------
// Shared types
// ---------------------------------------------------------------------------
export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  service?: string;
  message: string;
}

const FROM_ADDRESS = process.env.SES_FROM_EMAIL ?? "hello@cloudless.gr";

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function buildConfirmationHtml(data: ContactFormData): string {
  const rows = [
    data.service ? `<p style="margin:0 0 8px;font-size:14px;color:#cbd5e1;"><strong style="color:#3b82f6;">Service:</strong> ${esc(data.service)}</p>` : "",
    data.company ? `<p style="margin:0 0 8px;font-size:14px;color:#cbd5e1;"><strong style="color:#3b82f6;">Company:</strong> ${esc(data.company)}</p>` : "",
  ].join("");

  const bodyStyle = "margin:0;padding:0;background:#0a1628;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;";
  const outerTd = "background:#0a1628;padding:40px 20px;";
  const card = "background:#0f1f3d;border-radius:12px;max-width:600px;";
  const header = "background:#1a3a6b;padding:40px;text-align:center;border-bottom:1px solid #1e3a5f;";
  const bodyPad = "padding:40px;";
  const msgBox = "background:#0a1628;border:1px solid #1e3a5f;border-radius:8px;padding:24px;margin:0 0 24px;";
  const footer = "padding:24px 40px;border-top:1px solid #1e3a5f;text-align:center;";

  return [
    `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>`,
    `<body style="${bodyStyle}">`,
    `<table width="100%" cellpadding="0" cellspacing="0" style="${outerTd}"><tr><td align="center">`,
    `<table width="600" cellpadding="0" cellspacing="0" style="${card}">`,
    `<tr><td style="${header}">`,
    `<h1 style="margin:0;font-size:28px;color:#ffffff;">cloudless<span style="color:#00d4ff;">.gr</span></h1>`,
    `<p style="margin:8px 0 0;font-size:14px;color:#94a3b8;">Cloud Infrastructure &amp; Automation</p>`,
    `</td></tr>`,
    `<tr><td style="${bodyPad}">`,
    `<h2 style="margin:0 0 16px;font-size:22px;color:#ffffff;">Thank you, ${esc(data.name)}!</h2>`,
    `<p style="margin:0 0 24px;font-size:16px;line-height:1.6;color:#94a3b8;">We received your message and will reply within <strong style="color:#00d4ff;">24-48 hours</strong>.</p>`,
    `<div style="${msgBox}">${rows}<p style="margin:0;font-size:14px;color:#cbd5e1;line-height:1.6;">${esc(data.message)}</p></div>`,
    `<p style="margin:0;font-size:14px;color:#64748b;">Urgent? Email <a href="mailto:hello@cloudless.gr" style="color:#00d4ff;">hello@cloudless.gr</a></p>`,
    `</td></tr>`,
    `<tr><td style="${footer}"><p style="margin:0;font-size:12px;color:#475569;">&copy; 2025 cloudless.gr</p></td></tr>`,
    `</table></td></tr></table></body></html>`,
  ].join("\n");
}

// ---------------------------------------------------------------------------
// 1. Confirmation email → sent to the person who submitted the form
// ---------------------------------------------------------------------------
export async function sendContactConfirmation(
  data: ContactFormData
): Promise<void> {
  const client = getSESClient();

  const textLines = [
    `Hi ${data.name},`,
    ``,
    `Thank you for reaching out to cloudless.gr! We will reply within 24-48 hours.`,
    ``,
    data.service ? `Service: ${data.service}` : null,
    data.company ? `Company: ${data.company}` : null,
    ``,
    `Your message:`,
    data.message,
    ``,
    `-- The cloudless.gr team`,
  ].filter((l) => l !== null).join("\n");

  await client.send(
    new SendEmailCommand({
      Source: `cloudless.gr <${FROM_ADDRESS}>`,
      Destination: { ToAddresses: [data.email] },
      Message: {
        Subject: {
          Data: "We received your message — cloudless.gr",
          Charset: "UTF-8",
        },
        Body: {
          Html: { Data: buildConfirmationHtml(data), Charset: "UTF-8" },
          Text: { Data: textLines, Charset: "UTF-8" },
        },
      },
    })
  );
}

// ---------------------------------------------------------------------------
// 2. Internal notification email → sent to hello@cloudless.gr
// ---------------------------------------------------------------------------
export async function sendInternalContactNotification(
  data: ContactFormData
): Promise<void> {
  const client = getSESClient();

  const textLines = [
    `New contact form submission`,
    `===========================`,
    ``,
    `Name:    ${data.name}`,
    `Email:   ${data.email}`,
    data.company ? `Company: ${data.company}` : null,
    data.service ? `Service: ${data.service}` : null,
    ``,
    `Message:`,
    data.message,
    ``,
    `---`,
    `Submitted via cloudless.gr/contact`,
  ].filter((l) => l !== null).join("\n");

  const subject = `[Contact] ${data.name}${data.company ? ` — ${data.company}` : ""}`;

  await client.send(
    new SendEmailCommand({
      Source: `cloudless.gr Contact <${FROM_ADDRESS}>`,
      Destination: { ToAddresses: [FROM_ADDRESS] },
      ReplyToAddresses: [data.email],
      Message: {
        Subject: { Data: subject, Charset: "UTF-8" },
        Body: { Text: { Data: textLines, Charset: "UTF-8" } },
      },
    })
  );
}
