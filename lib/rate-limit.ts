const lastRequestByKey = new Map<string, number>();

export function isRateLimited(key: string, windowMs: number): boolean {
  const now = Date.now();
  const last = lastRequestByKey.get(key);

  if (last !== undefined && now - last < windowMs) {
    return true;
  }

  lastRequestByKey.set(key, now);
  return false;
}
