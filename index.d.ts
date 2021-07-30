
export type RedactorFunction = (obj: unknown) => unknown;

export type Phrase = string | number;
export type RedactResponse = string | unknown;

/**
 * Censor the given phrase
 * @param phrase phrase to be censored
 * @returns censored phrase
 */
declare const redact: (phrase: Phrase) => RedactResponse;
export { redact };

declare const redactor: (redactedKeys: string[]) => RedactorFunction;
export default redactor;
