console.debug("[btc-auth-sdk] Loaded SDK — top of file");

import * as jwt_decode_ns from "jwt-decode";
const jwt_decode = (jwt_decode_ns as any).default || jwt_decode_ns;

import { signMessageWithUnisat } from './signer';

console.debug("[btc-auth-sdk] After imports");

export type DecodedJWT = {
  exp: number;
  [key: string]: any;
};

export async function btcAuthLogin(serverUrl: string) {
  const challengeRes = await fetch(`${serverUrl}/auth/challenge`);
  if (!challengeRes.ok) throw new Error("Failed to get challenge from server.");
  const challenge = await challengeRes.text();

  const { address, signature } = await signMessageWithUnisat(challenge);

  const verifyRes = await fetch(`${serverUrl}/auth/verify`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ address, signature })
  });

  if (!verifyRes.ok) {
    throw new Error("Signature verification failed.");
  }

  const session = await verifyRes.json();
  const decoded = jwt_decode(session.token);

  localStorage.setItem("btcAuthToken", session.token);

  return {
    token: session.token,
    decoded
  };
}

export function getSession() {
  const token = localStorage.getItem("btcAuthToken");
  if (!token) return null;
  return jwt_decode(token) as DecodedJWT;
}
export function isSessionValid(): boolean {
  const session = getSession();
  if (!session || typeof session !== 'object' || !('exp' in session)) {
    return false;
  }

  const now = Math.floor(Date.now() / 1000);
  return (session as any).exp > now;
}