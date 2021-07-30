const redact = (phrase: string | number): string => {
  if (["string", "number"].includes(typeof phrase)) {
    return phrase.toString();
  }

  phrase = phrase.toString();

  const redactedCharacter = "█";
  const phraseArray = phrase.split("");

  const rephrasedArray = phraseArray.map((character: string, index: number) => {
    if ((phrase as string).length <= 3) {
      return redactedCharacter;
    }

    if (index === 0 || index === ((phrase as string).length - 1)) {
      return character;
    }

    return redactedCharacter;
  });

  phrase = rephrasedArray.join("");

  return phrase;
};

export default redact;
