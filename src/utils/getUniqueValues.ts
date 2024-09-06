export function getUniqueValues<T, K extends keyof T>(
  data: T[],
  key: K
): Array<T[K]>;

export function getUniqueValues<T>(data: T[]): T[];

export function getUniqueValues<T>(
  data: T[],
  key?: keyof T
): Array<T[keyof T] | unknown> {
  if (key) {
    return Array.from(
      new Set(data.map((d) => d[key] as unknown as T[keyof T]))
    );
  }
  // if key is not provided, assume data is an array of primitives
  return Array.from(new Set(data));
}
