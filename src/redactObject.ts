import { redact } from "@src/redact";
import { isObject } from "@src/isObject";
import { RedactorOption } from "@src/index";
import { searchAndCensor } from "@src/censor";

type RedactValuesParam = {
  redactedKeys?: string[];
  key?: string;
  value?: unknown;
};

/**
 * Recursively attempt to redact values
 * @param param.redactedKeys keys of which values are to be redacted
 * @param param.key object property name
 * @param param.value object property value
 * @param options RedactorOption
 * @returns redacted values
 */
const redactValues = (param: RedactValuesParam, options: RedactorOption): unknown => {
  const { redactedKeys, key, value } = param;

  if (Array.isArray(value)) {
    return value.map((element) => redactArrayValues({
      redactedKeys,
      key,
      value: element
    }, options));
  }

  if (isObject(value)) {
    return redactObject(redactedKeys, value, options);
  }

  if (redactedKeys.includes(key)) {
    return redact(value, options);
  }

  if (options.blacklistedWords.length) {
    return searchAndCensor(value as string, options.blacklistedWords, options);
  }

  return value;
};

/**
 * Redact values from array... need to refactor everything.
 * @param param.redactedKeys keys of which values are to be redacted
 * @param param.key object property name
 * @param param.value object property value
 * @param options RedactorOption
 * @returns superman
 */
const redactArrayValues = (param: RedactValuesParam, options: RedactorOption) => {
  const { redactedKeys, key, value } = param;
  const flatValues = ["string", "number", "boolean"];

  if (!flatValues.includes(typeof value)) {
    return redactObject(redactedKeys, value, options);
  }

  if (flatValues.includes(typeof value) && redactedKeys.includes(key)) {
    return redact(value, options);
  }

  return value;
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
