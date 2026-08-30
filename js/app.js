import { buildPayload, PayloadValidationError } from "./payload.js";
import {
  methodSupportsBody,
  sendWebhook,
  validateWebhookUrl,
  WebhookRequestError,
} from "./request.js";
import {
  addField,
  clearValidation,
  getElements,
  readFields,
  setPayloadEnabled,
  showLoading,
  showRequestError,
  showResponse,
  showValidationError,
} from "./ui.js";

const DEFAULT_FIELDS = [
  { key: "client", value: "Acme Corp" },
  { key: "email", value: "test@example.com" },
  { key: "source", value: "Website" },
];

const elements = getElements();

DEFAULT_FIELDS.forEach((field) => addField(field));
setPayloadEnabled(methodSupportsBody(elements.methodSelect.value));

elements.addFieldButton.addEventListener("click", () => addField(undefined, true));

elements.methodSelect.addEventListener("change", () => {
  clearValidation();
  setPayloadEnabled(methodSupportsBody(elements.methodSelect.value));
});

elements.form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const method = elements.methodSelect.value;

  try {
    clearValidation();
    const url = validateWebhookUrl(elements.urlInput.value.trim());
    const payload = methodSupportsBody(method) ? buildPayload(readFields()) : undefined;

    showLoading();
    const result = await sendWebhook({ url, method, payload });
    showResponse(result);
  } catch (error) {
    if (error instanceof PayloadValidationError) {
      showValidationError(error.message, error.fieldIndexes);
      return;
    }

    if (error instanceof WebhookRequestError && !elements.sendButton.disabled) {
      showValidationError(error.message);
      return;
    }

    showRequestError(error);
  }
});
