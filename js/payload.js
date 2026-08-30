export class PayloadValidationError extends Error {
  constructor(message, fieldIndexes = []) {
    super(message);
    this.name = "PayloadValidationError";
    this.fieldIndexes = fieldIndexes;
  }
}

export function buildPayload(fields) {
  const payload = {};
  const seenKeys = new Map();

  fields.forEach(({ key, value }, index) => {
    const normalizedKey = key.trim();

    if (!normalizedKey) {
      throw new PayloadValidationError(
        `Payload row ${index + 1} needs a field name. Remove the row if it is not needed.`,
        [index],
      );
    }

    const comparisonKey = normalizedKey.toLocaleLowerCase();
    if (seenKeys.has(comparisonKey)) {
      const firstIndex = seenKeys.get(comparisonKey);
      throw new PayloadValidationError(
        `Payload rows ${firstIndex + 1} and ${index + 1} use the same field name. Field names must be unique.`,
        [firstIndex, index],
      );
    }

    seenKeys.set(comparisonKey, index);
    payload[normalizedKey] = value;
  });

  return payload;
}
