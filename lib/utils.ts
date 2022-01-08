export const only = <T extends unknown>(x: T | T[]): T => Array.isArray(x) ? x[0] : x;

export type Awaited<T> = T extends Promise<infer U> ? Awaited<U> : T;
