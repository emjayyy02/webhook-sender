const METHODS_WITHOUT_BODY = new Set(["GET"]);

export class WebhookRequestError extends Error {
  constructor(message, cause) {
    super(message, { cause });
    this.name = "WebhookRequestError";
  }
}

export function validateWebhookUrl(value) {
  let url;

  try {
    url = new URL(value);
  } catch {
    throw new WebhookRequestError("Enter a complete webhook URL, including https:// or http://.");
  }

  if (!new Set(["http:", "https:"]).has(url.protocol)) {
    throw new WebhookRequestError("The webhook URL must use http:// or https://.");
  }

  return url.toString();
}

export function methodSupportsBody(method) {
  return !METHODS_WITHOUT_BODY.has(method.toUpperCase());
}

export async function sendWebhook({ url, method, payload }) {
  const normalizedMethod = method.toUpperCase();
  const requestOptions = {
    method: normalizedMethod,
    headers: {},
  };

  if (methodSupportsBody(normalizedMethod)) {
    requestOptions.headers["Content-Type"] = "application/json";
    requestOptions.body = JSON.stringify(payload);
  }

  const startedAt = performance.now();

  try {
    const response = await fetch(url, requestOptions);
    const duration = Math.round(performance.now() - startedAt);
    const rawBody = await response.text();
    const parsedBody = parseResponseBody(rawBody);

    return {
      ok: response.ok,
      status: response.status,
      statusText: response.statusText || "No status text",
      duration,
      body: parsedBody.body,
      format: parsedBody.format,
    };
  } catch (error) {
    const duration = Math.round(performance.now() - startedAt);
    throw new WebhookRequestError(
      "The request could not be completed. Check the URL, your connection, and whether the endpoint allows browser requests (CORS).",
      error,
    );
  }
}

function parseResponseBody(rawBody) {
  if (!rawBody) {
    return { body: "(Empty response body)", format: "EMPTY" };
  }

  try {
    return {
      body: JSON.stringify(JSON.parse(rawBody), null, 2),
      format: "JSON",
    };
  } catch {
    return { body: rawBody, format: "TEXT" };
  }
}
