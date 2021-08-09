import { RedactorOption } from "@src/index";

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

/**
 * Convert text to regular expression with global modifier
 * @param str text pattern
 * @returns RegExp
 */
const convertToExpression = (str: string): RegExp => {
  let expression: RegExp = str as unknown as  RegExp;

  if (typeof str === "string") {
    expression = new RegExp(str, "g");
  }

  return expression;
};

/**
 * Allows censoring based on the supplied keywords
 * @param phrase haystack, text where some parts are needed to be censored
 * @param searchPatterns list of phrase or text that needed to be censored
 * @param options RedactorOption
 * @returns censored text
 */
export const searchAndCensor = (phrase: string, searchPatterns: (string | RegExp)[], options: RedactorOption): string => {
  const censorFunction = options.fullRedaction ? censorStringFull : censorString;
  for (let pattern of searchPatterns) {
    pattern = convertToExpression(pattern as string);

    phrase = phrase.replace(pattern, (str) => {
      return censorFunction(str, options.maskCharacter);
    });
  }

  return phrase;
};
