/**
 * Check whether the value is object
 * @param value value to check
 * @returns boolean
 */
export const isObject = (value: unknown): boolean => {
  const isObjectType = typeof value === "object";
  const isNotEmpty = value !== null;

  return isObjectType && isNotEmpty;
};
