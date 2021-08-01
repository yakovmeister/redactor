import { redactObject } from "@src/redactObject";

export * as redact from "@src/redact";

export type RedactorFunction = (obj: unknown) => unknown;

export type RedactorOption = {
  maskCharacter?: string;
  fullRedaction?: boolean;
  blacklistedWords?: (string | RegExp)[];
};

const defaultRedactorOption = {
  maskCharacter: "█",
  blacklistedWords: [],
  fullRedaction: false
};

export default (redactedKeys: string[], options: RedactorOption = {}): RedactorFunction => {
  options = {
    ...defaultRedactorOption,
    ...options
  };

  return (obj: unknown): unknown => {
    return redactObject(redactedKeys, obj, options);
  };
};
