
export type RedactorFunction = (obj: unknown) => unknown;

export type Phrase = string | number;
export type RedactResponse = string | unknown;

export type RedactorOption = {
  maskCharacter?: string;
  blacklistedWords: (string | RegExp)[];
  fullRedaction?: boolean;
};

/**
 * Censor the given phrase
 * @param phrase phrase to be censored
 * @returns censored phrase
 */
declare const redact: (phrase: Phrase, options: RedactorOption) => RedactResponse;
export { redact };

declare const redactor: (redactedKeys: string[], options: RedactorOption) => RedactorFunction;
export default redactor;
