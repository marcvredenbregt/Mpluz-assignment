/**
 * Check if the given IP is valid
 * @param ip
 * @returns
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
