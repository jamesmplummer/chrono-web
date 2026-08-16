export function ObjectKeys<T extends Record<string | number | symbol, unknown>>(
  obj: T
) {
  return Object.keys(obj) as Array<keyof T>;
}

export function ObjectValues<
  T extends Record<string | number | symbol, unknown>
>(obj: T) {
  return Object.values(obj) as Array<T[keyof T]>;
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
