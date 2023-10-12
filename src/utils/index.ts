export const sleep = <T>(payload: T, durationMs: number) =>
  new Promise<T>((resolve) => setTimeout(() => resolve(payload), durationMs));
