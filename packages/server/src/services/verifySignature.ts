import * as bitcoinMessage from 'bitcoinjs-message';

export function verifySignature(address: string, signature: string, message: string): boolean {
  try {
    return bitcoinMessage.verify(message, address, signature);
  } catch (error) {
    console.error('Signature verification failed:', error);
    return false;
  }
}