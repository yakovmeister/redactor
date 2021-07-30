import redact from "@src/redact";

const redactObject = (redactedKeys: string[], obj: unknown) => {
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

export default redactObject;
