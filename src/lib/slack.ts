import { integrationFetch } from "@/lib/integrations/http";
import type { ContactFormData } from "@/lib/email";

/**
 * Send a Block Kit notification to Slack when a contact form is submitted.
 *
 * - Uses the integrationFetch wrapper (10 s timeout, 3 attempts, Retry-After)
 * - Fails gracefully: catches all errors and logs a warning — never throws
 * - Reads SLACK_WEBHOOK_URL from environment (set via SSM → Lambda env)
 */
export async function notifySlackNewContact(
  data: ContactFormData
): Promise<void> {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;
  if (!webhookUrl) {
    console.warn("[slack] SLACK_WEBHOOK_URL not set — skipping notification");
    return;
  }

  const preview =
    data.message.length > 500
      ? data.message.slice(0, 500) + "…"
      : data.message;

  const metaFields: Array<{ type: string; text: { type: string; text: string } }> = [
    { type: "mrkdwn", text: { type: "mrkdwn", text: `*Name*\n${data.name}` } },
    { type: "mrkdwn", text: { type: "mrkdwn", text: `*Email*\n${data.email}` } },
  ];
  if (data.company) {
    metaFields.push({ type: "mrkdwn", text: { type: "mrkdwn", text: `*Company*\n${data.company}` } });
  }
  if (data.service) {
    metaFields.push({ type: "mrkdwn", text: { type: "mrkdwn", text: `*Service*\n${data.service}` } });
  }

  const timestamp = new Date().toLocaleString("el-GR", {
    timeZone: "Europe/Athens",
    dateStyle: "medium",
    timeStyle: "short",
  });

  const payload = {
    blocks: [
      {
        type: "header",
        text: { type: "plain_text", text: "📬 New Contact Form Submission", emoji: true },
      },
      {
        type: "section",
        fields: metaFields.map((f) => f.text),
      },
      { type: "divider" },
      {
        type: "section",
        text: { type: "mrkdwn", text: `*Message*\n>${preview.replace(/\n/g, "\n>")}` },
      },
      {
        type: "context",
        elements: [
          { type: "mrkdwn", text: `Submitted at ${timestamp} (Athens) via cloudless.gr/contact` },
        ],
      },
    ],
  };

  try {
    const response = await integrationFetch(webhookUrl, {
      label: "slack-contact-webhook",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const body = await response.text().catch(() => "(unreadable)");
      console.warn(`[slack] Webhook returned ${response.status}: ${body}`);
    }
  } catch (err) {
    console.warn("[slack] Failed to send contact notification:", err);
  }
}
