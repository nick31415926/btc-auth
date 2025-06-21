const challengeMap = new Map<string, string>();

export function saveChallenge(address: string, challenge: string): void {
  challengeMap.set(address, challenge);
}

export function getChallenge(address: string): string | undefined {
  return challengeMap.get(address);
}

export function deleteChallenge(address: string): void {
  challengeMap.delete(address);
}

export function hasChallenge(address: string): boolean {
  return challengeMap.has(address);
}

export function clearChallenges(): void {
  challengeMap.clear();
}