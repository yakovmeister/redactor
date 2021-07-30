type Phrase = string | number | unknown;
type RedactResponse = string | unknown;

/**
 * The actual function that censors the string
 * @param phrase string to be censored
 * @param redactorCharacter character used to replace string
 * @returns censored phrase
 */
const censorString = (phrase: string, redactorCharacter: string): string => {
  const phraseArray = phrase.split("");

  const rephrasedArray = phraseArray.map((character: string, index: number) => {
    if (phrase.length <= 3) {
      return redactorCharacter;
    }

    if (index === 0 || index === (phrase.length - 1)) {
      return character;
    }

    return redactorCharacter;
  });

  return rephrasedArray.join("");
};


/**
 * Censor the given phrase
 * @param phrase phrase to be censored
 * @returns censored phrase
 */
export const redact = (phrase: Phrase): RedactResponse => {
  const acceptedPhraseType = ["string", "number"];
  const phraseType = typeof phrase;
  const phraseIsAccepted = acceptedPhraseType.includes(phraseType);

  if (!phraseIsAccepted) {
    return phrase;
  }

  phrase = phrase.toString();

  const redactedCharacter = "█";

  return censorString(phrase as string, redactedCharacter);
};
