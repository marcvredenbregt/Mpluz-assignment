/**
 * Get a random value from an enum
 * @param enumValue
 * @returns
 * @example
 * const randomInputState = getRandomEnum(InputState);
 */
export function getRandomEnum<T extends Record<string, string | number>>(
  enumValue: T,
): T[keyof T] {
  const values = Object.keys(enumValue);
  const randomIndex = Math.floor(Math.random() * values.length);

  return enumValue[values[randomIndex]] as T[keyof T];
}
