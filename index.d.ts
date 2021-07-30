
export type RedactorFunction = (obj: unknown) => unknown;

/**
 * Censor the given phrase
 * @param phrase phrase to be censored
 * @returns censored phrase
 */
declare const redact: (phrase: string | number) => string | unknown;
export { redact };

declare const redactor: (redactedKeys: string[]) => RedactorFunction;
export default redactor;
