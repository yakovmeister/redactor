/**
 * The actual function that censors the whole string
 * @param phrase string to be censored
 * @param redactorCharacter character used to replace string
 * @returns censored phrase
 */
export const censorStringFull = (phrase: string, redactorCharacter: string): string => {
  const phraseArray = phrase.split("");

  const rephrasedArray = phraseArray.map(() => {
    return redactorCharacter;
  });

  return rephrasedArray.join("");
};

/**
 * The actual function that censors the string partially
 * @param phrase string to be censored
 * @param redactorCharacter character used to replace string
 * @returns censored phrase
 */
export const censorString = (phrase: string, redactorCharacter: string): string => {
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
