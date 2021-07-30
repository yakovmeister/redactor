import { redact } from "@src/redact";
import { isObject } from "@src/isObject";

/**
 * Loop through each key-value pair and censor specific based on the given key
 * @param redactedKeys keys of which values are to be redacted
 * @param obj key-value pair with redactable values
 * @returns key-value pair with redacted values
 */
export const redactObject = (redactedKeys: string[], obj: unknown) => {
  const keyvalpair = Object.entries(obj);
  const redacted = {};

  for (const pair of keyvalpair) {
    const [key, value] = pair;
    let newValue = value;

    if (redactedKeys.includes(key)) {
      newValue = redact(value);
    }

    redacted[key] = newValue;

    if (isObject(value)) {
      redacted[key] = redactObject(redactedKeys, value);
    }
  }

  return redacted;
};
