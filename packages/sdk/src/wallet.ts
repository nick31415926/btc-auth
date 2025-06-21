declare global {
  interface Window {
    unisat?: any;
  }
}

export function isUnisatAvailable(): boolean {
  return typeof window !== 'undefined' && !!window.unisat;
}

export function getUnisat(): typeof window.unisat | null {
  return isUnisatAvailable() ? window.unisat : null;
}