export function getRandomEnum<T extends Record<string, string | number>>(
  enumValue: T,
): T[keyof T] {
  const values = Object.keys(enumValue);
  const randomIndex = Math.floor(Math.random() * values.length);

  return enumValue[values[randomIndex]] as T[keyof T];

  // return enumValue[values[randomIndex]] as T[keyof T];
}
