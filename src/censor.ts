/**
 * The actual function that censors the whole string
 * @param phrase string to be censored
 * @param redactorCharacter character used to replace string
 * @returns censored phrase
 */
export const censorStringFull = (phrase: string, redactorCharacter: string): string => {
  const pattern = /.*/;

  const replacerFunction = (str: string): string => {
    return "".padStart(str.length, redactorCharacter);
  };

  return phrase.replace(pattern, replacerFunction);
};

/**
 * The actual function that censors the string partially
 * @param phrase string to be censored
 * @param redactorCharacter character used to replace string
 * @returns censored phrase
 */
export const censorString = (phrase: string, redactorCharacter: string): string => {
  const pattern = /(.)(.*)(.)/;

  const replacerFunction = (str: string, str2: string, str3: string, str4: string): string => {
    const masked =  "".padStart(str3.length, redactorCharacter);

    return `${str2}${masked}${str4}`;
  };

  if (phrase.length <= 3) {
    return censorStringFull(phrase, redactorCharacter);
  }

  return phrase.replace(pattern, replacerFunction);
};
