import { assert } from '@ember/debug';

/*
 * Determine whether the current environment has support
 * for a given persistence type. This simply checks if the
 * environment has an object on its window property with
 * the same name as the persistence type specified.
 *
 * @method supportsPersistence
 *
 * @param {String} type
 *   The persistence type.
 *
 * @return {Boolean}
 *   True if the current environment has support for the persistence type, otherwise false.
 */
export default function supportsPersistence(type) {
  assert('No persistence type has been specified', type);

  if (typeof window !== 'undefined' && typeof window[type] !== 'undefined') {
    return true;
  }

  return false;
}
