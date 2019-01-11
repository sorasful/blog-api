import { DeepPartial } from 'typeorm';

/**
 * Used in copy constructors to get either a value from
 * a given object (`source`) or (if `source` is undefined)
 * a default value (`defaultValue`).
 *
 * @param source Value to be copied (*!* must be a property name, not a path).
 * @param defaultValue Default value if the `source` is undefined.
 *
 * @return Either the `source` (if not `undefined`) or `defaultValue`.
 */
export function getOrDefault<T>(source: T | undefined, defaultValue: T) {
  return source === undefined ? defaultValue : source;
}

/**
 * Call the copy constructor of `sourceClass` if `source` is
 * defined, and return the resulting copy. Otherwise, return
 * `undefined` (if `source` is `null` or `undefined`).
 *
 * @param sourceClass Class type of the entity to be copied.
 * @param source Entity to be copied, if defined.
 *
 * @return Result of the copy constructor (with `source`, if any), or `undefined`.
 */
export function getCopyConstruction<T extends object>(
  sourceClass: new (copy: T) => T,
  source: T | Partial<T> | DeepPartial<T> | undefined,
): T | undefined {
  return source === null || source === undefined
    ? undefined
    : new sourceClass(source as T);
}

/**
 * Call the copy constructor of `sourceClass` for each
 * instance of `sourceClass` provided in `sources`. Undefined
 * values (if any) in `sources` are filtered.
 *
 * @param sourceClass Class type of the entity to be copied.
 * @param sources Entities to be copied (`undefined` are skipped).
 *
 * @return `undefined` if `sources` is `undefined` or a new array containing the copies of `sources`.
 */
export function getCopyConstructions<T extends object>(
  sourceClass: new (copy: T) => T,
  sources: T[] | Array<Partial<T>> | Array<DeepPartial<T>> | undefined,
): T[] | undefined {
  return sources === null || sources === undefined
    ? undefined
    : (sources as T[])
        .filter(source => source)
        .map(source => new sourceClass(source));
}
