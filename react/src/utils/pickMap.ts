type PickMapKeys<T, U extends boolean> = (keyof {
  [K in keyof T as T[K] extends U ? K : never]: T[K] extends true
    ? T[K]
    : never;
})[];

type ObjectLikePickMap<T extends object, U extends object> = {
  [K in keyof T]: K extends keyof U ? U[K] : undefined;
};

export type PickMapType<T> = { [K in keyof Required<T>]: boolean };

export class PickMap<T extends object> {
  private map: T;
  constructor(map: T) {
    this.map = map;
  }

  get keys() {
    return this.getTypedKeys();
  }

  get values() {
    return { ...this.map };
  }

  get truthyKeys() {
    const keys = this.getTypedKeys();
    return keys.filter((key) => this.map[key]) as PickMapKeys<T, true>;
  }

  get falsyKeys() {
    const keys = this.getTypedKeys();
    return keys.filter((key) => !this.map[key]) as PickMapKeys<T, false>;
  }

  pick<U extends ObjectLikePickMap<T, U>>(obj: Partial<U>) {
    const keys = this.truthyKeys;
    return this.pickObject<U, true>(obj, keys);
  }

  private getTypedKeys() {
    return Object.keys(this.map as {}) as (keyof T)[];
  }

  private pickObject<U extends ObjectLikePickMap<T, U>, V extends boolean>(
    obj: Partial<U>,
    keys: PickMapKeys<T, V>
  ) {
    const pickedObj = {} as { [K in (typeof keys)[number]]: U[K] };
    for (const key of keys) {
      (pickedObj as any)[key] = obj[key];
    }

    return pickedObj;
  }
}
