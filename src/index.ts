import redactObject from "@src/redactObject";

export * as redact from "@src/redact";

export type RedactorFunction = (obj: unknown) => unknown;

export default (redactedKeys: string[]): RedactorFunction => {
  const redactor = (obj: unknown): unknown => {
    return redactObject(redactedKeys, obj);
  };

  return redactor;
};
