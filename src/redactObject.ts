import { redact } from "@src/redact";

/**
 * Loop through each key-value pair and censor specific based on the given key
 * @param redactedKeys keys of which values are to be redacted
 * @param obj key-value pair with redactable values
 * @returns key-value pair with redacted values
 */
export const redactObject = (redactedKeys: string[], obj: unknown) => {
  const keyvalpair = Object.entries(obj);
  const redacted = {};

  for (let index = 0; index < keyvalpair.length; index++) {
    const [key, value] = keyvalpair[index];
    let newValue = value;

    if (redactedKeys.includes(key)) {
      newValue = redact(value);
    }

    redacted[key] = newValue;
  }

  return redacted;
};
