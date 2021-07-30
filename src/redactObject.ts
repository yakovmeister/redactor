import { redact } from "@src/redact";
import { isObject } from "@src/isObject";

/**
 * Recursively attempt to redact values
 * @param redactedKeys keys of which values are to be redacted
 * @param key object property name
 * @param value object property value
 * @returns redacted values
 */
const redactValues = (redactedKeys: string[], key: string, value: unknown): unknown => {
  let newValue = value;

  if (redactedKeys.includes(key)) {
    newValue = redact(value);
  }

  if (Array.isArray(value)) {
    newValue = value.map((element) => redactObject(redactedKeys, element));
  }

  if (isObject(value)) {
    newValue = redactObject(redactedKeys, value);
  }

  return newValue;
};

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

    redacted[key] = redactValues(redactedKeys, key, value);
  }

  return redacted;
};
