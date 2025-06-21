import crypto from 'crypto';

/**
 * Generates a cryptographically secure random challenge string.
 * @param length The length of the string (default: 32)
 * @returns A hex-encoded challenge string
 */
export function generateChallenge(length: number = 32): string {
  return crypto.randomBytes(length).toString('hex');
}