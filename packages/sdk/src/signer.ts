import { getUnisat } from './wallet';

export async function signMessageWithUnisat(message: string): Promise<{ address: string; signature: string }> {
  const unisat = getUnisat();
  if (!unisat) {
    throw new Error("Unisat wallet not detected.");
  }

  const address = await unisat.getAccounts().then(a => a[0]);
  const signature = await unisat.signMessage(message);

  return { address, signature };
}