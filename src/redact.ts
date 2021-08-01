import { RedactorOption } from "@src/index";
import { censorStringFull, censorString } from "@src/censor";

type Phrase = string | number | unknown;
type RedactResponse = string | unknown;

/**
 * Censor the given phrase
 * @param phrase phrase to be censored
 * @returns censored phrase
 */
export const redact = (phrase: Phrase, options: RedactorOption): RedactResponse => {
  const acceptedPhraseType = ["string", "number"];
  const phraseType = typeof phrase;
  const phraseIsAccepted = acceptedPhraseType.includes(phraseType);

  if (!phraseIsAccepted) {
    return phrase;
  }

  phrase = phrase.toString();

  if (options.fullRedaction) {
    return censorStringFull(phrase as string, options.maskCharacter);
  }

  return censorString(phrase as string, options.maskCharacter);
};
