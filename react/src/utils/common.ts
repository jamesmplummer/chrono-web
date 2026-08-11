export function ObjectKeys<T extends Record<string | number | symbol, unknown>>(
  obj: T
) {
  return Object.keys(obj) as Array<keyof T>;
}
