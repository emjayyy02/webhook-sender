import assert from "node:assert/strict";
import { buildPayload, PayloadValidationError } from "../js/payload.js";
import {
  methodSupportsBody,
  sendWebhook,
  validateWebhookUrl,
  WebhookRequestError,
} from "../js/request.js";

const tests = [];

function test(name, callback) {
  tests.push({ name, callback });
}

test("builds a payload from key/value fields", () => {
  assert.deepEqual(
    buildPayload([
      { key: " client ", value: "Acme Corp" },
      { key: "source", value: "Website" },
    ]),
    { client: "Acme Corp", source: "Website" },
  );
});

test("rejects empty payload keys", () => {
  assert.throws(
    () => buildPayload([{ key: " ", value: "unused" }]),
    (error) => error instanceof PayloadValidationError && error.fieldIndexes[0] === 0,
  );
});

test("rejects duplicate payload keys without case sensitivity", () => {
  assert.throws(
    () =>
      buildPayload([
        { key: "Email", value: "first@example.com" },
        { key: "email", value: "second@example.com" },
      ]),
    (error) => error instanceof PayloadValidationError && error.fieldIndexes.length === 2,
  );
});

test("accepts http and https webhook URLs", () => {
  assert.equal(validateWebhookUrl("https://example.com/hook"), "https://example.com/hook");
  assert.equal(validateWebhookUrl("http://localhost:5678/test"), "http://localhost:5678/test");
});

test("rejects incomplete and unsupported webhook URLs", () => {
  assert.throws(() => validateWebhookUrl("example.com/hook"), WebhookRequestError);
  assert.throws(() => validateWebhookUrl("file:///tmp/hook"), WebhookRequestError);
});

test("identifies GET as a bodyless method", () => {
  assert.equal(methodSupportsBody("GET"), false);
  assert.equal(methodSupportsBody("POST"), true);
  assert.equal(methodSupportsBody("DELETE"), true);
});

test("sends JSON for POST and formats a JSON response", async () => {
  let capturedOptions;
  globalThis.fetch = async (_url, options) => {
    capturedOptions = options;
    return new Response('{"accepted":true}', {
      status: 200,
      statusText: "OK",
      headers: { "Content-Type": "application/json" },
    });
  };

  const result = await sendWebhook({
    url: "https://example.com/hook",
    method: "POST",
    payload: { client: "Acme Corp" },
  });

  assert.equal(capturedOptions.headers["Content-Type"], "application/json");
  assert.equal(capturedOptions.body, '{"client":"Acme Corp"}');
  assert.equal(result.body, '{\n  "accepted": true\n}');
  assert.equal(result.format, "JSON");
});

test("does not attach headers or a body to GET", async () => {
  let capturedOptions;
  globalThis.fetch = async (_url, options) => {
    capturedOptions = options;
    return new Response("Accepted", { status: 202, statusText: "Accepted" });
  };

  const result = await sendWebhook({
    url: "https://example.com/hook",
    method: "GET",
    payload: { ignored: "value" },
  });

  assert.deepEqual(capturedOptions.headers, {});
  assert.equal("body" in capturedOptions, false);
  assert.equal(result.body, "Accepted");
  assert.equal(result.format, "TEXT");
});

test("turns fetch failures into actionable request errors", async () => {
  globalThis.fetch = async () => {
    throw new TypeError("Failed to fetch");
  };

  await assert.rejects(
    () => sendWebhook({ url: "https://example.com/hook", method: "POST", payload: {} }),
    (error) => error instanceof WebhookRequestError && error.message.includes("CORS"),
  );
});

let failures = 0;

for (const { name, callback } of tests) {
  try {
    await callback();
    console.log(`PASS ${name}`);
  } catch (error) {
    failures += 1;
    console.error(`FAIL ${name}`);
    console.error(error);
  }
}

if (failures > 0) {
  process.exitCode = 1;
} else {
  console.log(`\n${tests.length} tests passed.`);
}
