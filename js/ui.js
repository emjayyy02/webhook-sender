const elements = {
  form: document.querySelector("#webhook-form"),
  urlInput: document.querySelector("#webhook-url"),
  methodSelect: document.querySelector("#http-method"),
  payloadFieldset: document.querySelector("#payload-fieldset"),
  payloadFields: document.querySelector("#payload-fields"),
  payloadRowTemplate: document.querySelector("#payload-row-template"),
  addFieldButton: document.querySelector("#add-field"),
  sendButton: document.querySelector("#send-button"),
  sendButtonLabel: document.querySelector("#send-button .button-label"),
  methodNote: document.querySelector("#method-note"),
  formError: document.querySelector("#form-error"),
  responseContent: document.querySelector("#response-content"),
  responseState: document.querySelector("#response-state"),
  emptyResponse: document.querySelector("#empty-response"),
  responseResult: document.querySelector("#response-result"),
  responseStatus: document.querySelector("#response-status"),
  responseDuration: document.querySelector("#response-duration"),
  responseFormat: document.querySelector("#response-format"),
  responseBody: document.querySelector("#response-body"),
};

export function addField(field = { key: "", value: "" }, shouldFocus = false) {
  const fragment = elements.payloadRowTemplate.content.cloneNode(true);
  const row = fragment.querySelector(".payload-row");
  const keyInput = fragment.querySelector(".payload-key");
  const valueInput = fragment.querySelector(".payload-value");
  const removeButton = fragment.querySelector(".remove-field");
  const rowNumber = elements.payloadFields.children.length + 1;

  keyInput.value = field.key;
  valueInput.value = field.value;
  keyInput.setAttribute("aria-label", `Payload field ${rowNumber} name`);
  valueInput.setAttribute("aria-label", `Payload field ${rowNumber} value`);
  removeButton.setAttribute("aria-label", `Remove payload field ${rowNumber}`);

  removeButton.addEventListener("click", () => {
    row.remove();
    renumberFields();
    clearValidation();
  });

  elements.payloadFields.append(fragment);

  if (shouldFocus) {
    keyInput.focus();
  }
}

export function readFields() {
  return [...elements.payloadFields.querySelectorAll(".payload-row")].map((row) => ({
    key: row.querySelector(".payload-key").value,
    value: row.querySelector(".payload-value").value,
  }));
}

export function setPayloadEnabled(isEnabled) {
  elements.payloadFieldset.disabled = !isEnabled;
  elements.methodNote.textContent = isEnabled
    ? "A JSON request body will be included."
    : "GET requests do not include a request body.";
}

export function showLoading() {
  clearValidation();
  elements.sendButton.disabled = true;
  elements.sendButton.classList.add("is-loading");
  elements.sendButtonLabel.textContent = "Sending";
  elements.responseContent.setAttribute("aria-busy", "true");
  setResponseState("loading", "SENDING");
}

export function showResponse(result) {
  elements.emptyResponse.hidden = true;
  elements.responseResult.hidden = false;
  elements.responseStatus.textContent = `${result.status} ${result.statusText}`;
  elements.responseDuration.textContent = `${result.duration} ms`;
  elements.responseFormat.textContent = result.format;
  elements.responseBody.textContent = result.body;
  setResponseState(result.ok ? "success" : "error", result.ok ? "DELIVERED" : "HTTP ERROR");
  finishLoading();
}

export function showRequestError(error) {
  elements.emptyResponse.hidden = true;
  elements.responseResult.hidden = false;
  elements.responseStatus.textContent = "Request failed";
  elements.responseDuration.textContent = "—";
  elements.responseFormat.textContent = "ERROR";
  elements.responseBody.textContent = error.message;
  setResponseState("error", "FAILED");
  finishLoading();
}

export function showValidationError(message, fieldIndexes = []) {
  elements.formError.textContent = message;
  elements.formError.hidden = false;

  if (fieldIndexes.length > 0) {
    const rows = [...elements.payloadFields.querySelectorAll(".payload-row")];
    fieldIndexes.forEach((index) => rows[index]?.querySelector(".payload-key")?.setAttribute("aria-invalid", "true"));
    rows[fieldIndexes[0]]?.querySelector(".payload-key")?.focus();
  } else {
    elements.urlInput.setAttribute("aria-invalid", "true");
    elements.urlInput.focus();
  }
}

export function clearValidation() {
  elements.formError.hidden = true;
  elements.formError.textContent = "";
  elements.urlInput.removeAttribute("aria-invalid");
  elements.payloadFields.querySelectorAll("[aria-invalid]").forEach((input) => {
    input.removeAttribute("aria-invalid");
  });
}

export function getElements() {
  return elements;
}

function finishLoading() {
  elements.sendButton.disabled = false;
  elements.sendButton.classList.remove("is-loading");
  elements.sendButtonLabel.textContent = "Send webhook";
  elements.responseContent.setAttribute("aria-busy", "false");
}

function setResponseState(type, label) {
  elements.responseState.className = `response-state response-state--${type}`;
  elements.responseState.textContent = label;
}

function renumberFields() {
  [...elements.payloadFields.querySelectorAll(".payload-row")].forEach((row, index) => {
    const rowNumber = index + 1;
    row.querySelector(".payload-key").setAttribute("aria-label", `Payload field ${rowNumber} name`);
    row.querySelector(".payload-value").setAttribute("aria-label", `Payload field ${rowNumber} value`);
    row.querySelector(".remove-field").setAttribute("aria-label", `Remove payload field ${rowNumber}`);
  });
}
