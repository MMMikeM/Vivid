export const getKeys = <T extends object>(obj: T) =>
  Object.keys(obj) as Array<keyof T>;

export const getValues = <T extends object>(obj: T) =>
  Object.values(obj) as Array<T[keyof T]>;

export const getEntries = <T extends object>(obj: T) =>
  Object.entries(obj) as Array<[keyof T, T[keyof T]]>;

export type EntriesType =
  | [PropertyKey, unknown][]
  | ReadonlyArray<readonly [PropertyKey, unknown]>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type UnionToIntersection<T> = (T extends any ? (k: T) => void : never) extends (
  k: infer I
) => void
  ? I
  : never;

type UnionObjectFromArrayOfPairs<T extends EntriesType> = T extends (infer R)[]
  ? R extends [infer key, infer val]
    ? { [prop in key & PropertyKey]: val }
    : never
  : never;

type Merge<T> = { [key in keyof T]: T[key] };

type EntriesToObject<T extends EntriesType> = Merge<
  UnionToIntersection<UnionObjectFromArrayOfPairs<T>>
>;

/**
 * ```md
 * **************************
 * * Caution, this is risky *
 * **************************
 * ```
 *
 * @param arr Use the as EntriesType assertion if you are having issues here
 */
export const fromEntries = <T extends EntriesType>(
  arr: T
): EntriesToObject<T> => {
  return Object.fromEntries(arr) as EntriesToObject<T>;
};

export const safeFromEntries = (arr: EntriesType) => Object.fromEntries(arr);
