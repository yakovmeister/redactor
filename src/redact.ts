type Phrase = string | number;
type RedactResponse = string | unknown;

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

  // phrase = phrase.toString();

  // const redactedCharacter = "█";
  // const phraseArray = phrase.split("");

  // const rephrasedArray = phraseArray.map((character: string, index: number) => {
  //   if ((phrase as string).length <= 3) {
  //     return redactedCharacter;
  //   }

  //   if (index === 0 || index === ((phrase as string).length - 1)) {
  //     return character;
  //   }

  //   return redactedCharacter;
  // });

  // phrase = rephrasedArray.join("");

  return phrase;
};
