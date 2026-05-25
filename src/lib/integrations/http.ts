export interface IntegrationFetchOptions extends RequestInit {
  /** Human-readable label used in error messages and Sentry breadcrumbs */
  label: string;
  /** Timeout in milliseconds (default: 10 000) */
  timeoutMs?: number;
  /** Maximum attempts including the first (default: 3) */
  maxAttempts?: number;
}

/**
 * Fetch wrapper for third-party integrations.
 *
 * Features:
 * - 10 s AbortController timeout per attempt
 * - Up to 3 attempts with exponential back-off (200 ms, 400 ms)
 * - Respects Retry-After header on HTTP 429 responses
 * - Optional Sentry breadcrumb on failure (soft import, never throws)
 *
 * Throws the last encountered Error if all attempts are exhausted.
 */
export async function integrationFetch(
  url: string,
  options: IntegrationFetchOptions
): Promise<Response> {
  const { label, timeoutMs = 10_000, maxAttempts = 3, ...fetchOptions } = options;
  const delays = [200, 400]; // ms between retries

  let lastError: Error = new Error(`integrationFetch(${label}): no attempts made`);

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(url, {
        ...fetchOptions,
        signal: controller.signal,
      });

      // On 429 honour Retry-After (seconds) before the next attempt
      if (response.status === 429 && attempt < maxAttempts - 1) {
        const retryAfter = parseInt(
          response.headers.get("Retry-After") ?? "1",
          10
        );
        await sleep(retryAfter * 1_000);
        lastError = new Error(`${label}: 429 rate-limited`);
        continue;
      }

      return response;
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err));

      // Optional Sentry breadcrumb — never throws if Sentry is absent
      try {
        // eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-explicit-any
        const Sentry = require("@sentry/nextjs") as any;
        Sentry.addBreadcrumb({
          category: "integration",
          message: `${label} attempt ${attempt + 1} failed: ${lastError.message}`,
          level: "warning",
        });
      } catch {
        // Sentry not available — silently continue
      }

      if (attempt < maxAttempts - 1) {
        await sleep(delays[attempt] ?? 400);
      }
    } finally {
      clearTimeout(timer);
    }
  }

  throw lastError;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
