import { redact } from "@src/redact";
import { isObject } from "@src/isObject";
import { RedactorOption } from "@src/index";

type RedactValuesParam = {
  redactedKeys?: string[];
  key?: string;
  value?: unknown;
};

/**
 * Recursively attempt to redact values
 * @param redactedKeys keys of which values are to be redacted
 * @param key object property name
 * @param value object property value
 * @returns redacted values
 */
const redactValues = (param: RedactValuesParam, options: RedactorOption): unknown => {
  const { redactedKeys, key, value } = param;

  let newValue = value;

  if (Array.isArray(value)) {
    newValue = value.map((element) => redactObject(redactedKeys, element, options));
  }

  if (isObject(value)) {
    newValue = redactObject(redactedKeys, value, options);
  }

  if (redactedKeys.includes(key)) {
    newValue = redact(value, options);
  }

  return newValue;
};

/**
 * Loop through each key-value pair and censor specific based on the given key
 * @param redactedKeys keys of which values are to be redacted
 * @param obj key-value pair with redactable values
 * @returns key-value pair with redacted values
 */
export const redactObject = (redactedKeys: string[], obj: unknown, options: RedactorOption) => {
  const keyvalpair = Object.entries(obj);
  const redacted = {};

  for (const pair of keyvalpair) {
    const [key, value] = pair;

    redacted[key] = redactValues({
      redactedKeys,
      key,
      value
    }, options);
  }

  return redacted;
};
