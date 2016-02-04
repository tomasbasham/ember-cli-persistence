import Ember from 'ember';

const {
  isPresent
} = Ember;

const {
  parse,
  stringify
} = JSON;

/*
 * Stringify an object so it can be inserted into the store
 * by a specific persistence container.
 *
 * @method toJson
 *
 * @param {Object} value
 *   A POJO to be inserted into the store.
 *
 * @return {String}
 *   A JSON string representation of the POJO.
 */
export function toJson(value) {
  if (isPresent(value)) {
    return stringify(value);
  }

  return value;
}

/*
 * Parse a JSON string safely from the store so it can be
 * used by the persistence container.
 *
 * @method toObject
 *
 * @param {String} value
 *   A JSON string from the store.
 *
 * @return {Object}
 *   A POJO representation of the stored string value.
 */
export function toObject(value) {
  if (isPresent(value)) {
    try {
      value = parse(value);
    } catch(e) {
      value = null;
    }
  }

  return value;
}
