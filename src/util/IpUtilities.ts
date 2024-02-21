/**
 * Check if the given IP is valid
 * @param ip
 * @returns true if the IP is valid
 * @example
 * const isValid = isValidIp('10.73.25.10');
 * -> true
 */
export function isValidIp(ip: string): boolean {
  const ipRegex = new RegExp(
    '^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.' +
      '(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.' +
      '(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.' +
      '(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$',
  );

  return ipRegex.test(ip);
}
