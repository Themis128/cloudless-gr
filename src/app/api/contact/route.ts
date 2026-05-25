import { NextRequest, NextResponse } from "next/server";
import {
  sendContactConfirmation,
  sendInternalContactNotification,
  type ContactFormData,
} from "@/lib/email";
import { notifySlackNewContact } from "@/lib/slack";

// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------
interface ValidationError {
  field: string;
  message: string;
}

function validateContactForm(body: Record<string, unknown>): ValidationError[] {
  const errors: ValidationError[] = [];
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!body.name || typeof body.name !== "string" || body.name.trim().length < 2) {
    errors.push({ field: "name", message: "Name must be at least 2 characters." });
  }

  if (!body.email || typeof body.email !== "string" || !emailRegex.test(body.email.trim())) {
    errors.push({ field: "email", message: "A valid email address is required." });
  }

  if (
    !body.message ||
    typeof body.message !== "string" ||
    body.message.trim().length < 10 ||
    body.message.trim().length > 5000
  ) {
    errors.push({
      field: "message",
      message: "Message must be between 10 and 5 000 characters.",
    });
  }

  return errors;
}

// ---------------------------------------------------------------------------
// POST /api/contact
// ---------------------------------------------------------------------------
export async function POST(request: NextRequest): Promise<NextResponse> {
  let body: Record<string, unknown>;

  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid JSON in request body." },
      { status: 400 }
    );
  }

  // Validate
  const errors = validateContactForm(body);
  if (errors.length > 0) {
    return NextResponse.json({ success: false, errors }, { status: 422 });
  }

  const data: ContactFormData = {
    name: (body.name as string).trim(),
    email: (body.email as string).trim().toLowerCase(),
    company: body.company ? (body.company as string).trim() : undefined,
    service: body.service ? (body.service as string).trim() : undefined,
    message: (body.message as string).trim(),
  };

  // Fire confirmation email + internal email in parallel.
  // Slack notification is always non-fatal.
  const [confirmResult, internalResult] = await Promise.allSettled([
    sendContactConfirmation(data),
    sendInternalContactNotification(data),
    notifySlackNewContact(data), // index 2 — failure is non-fatal
  ]);

  // If either SES email failed, return 500
  if (confirmResult.status === "rejected" || internalResult.status === "rejected") {
    const reason =
      confirmResult.status === "rejected"
        ? confirmResult.reason
        : (internalResult as PromiseRejectedResult).reason;

    console.error("[contact] SES send failed:", reason);

    return NextResponse.json(
      {
        success: false,
        error:
          "We could not send your message due to a technical issue. " +
          "Please try again or email us directly at hello@cloudless.gr.",
      },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
