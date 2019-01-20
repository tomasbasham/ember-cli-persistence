import Base from 'ember-cli-persistence/containers/base';
import { toJson, toObject } from 'ember-cli-persistence/utils/object-transforms';

import { assert } from '@ember/debug';
import { computed, get } from '@ember/object';
import { assign } from '@ember/polyfills';
import { isPresent } from '@ember/utils';

export default Base.extend({

  /*
   * Create a simple map object to
   * act as an in-memory store.
   *
   * @type {Object}
   */
  storage: computed({
    get() {
      return new Map();
    }
  }).readOnly(),

  /*
   * Add a key to the store, or update
   * that key's value if it already
   * exists.
   *
   * @method setItem
   *
   * @param {String} key
   *   A string containing the name of the key you want to create/update.
   *
   * @param {Object} value
   *   An object containing the value you want to give the key you are creating/updating.
   */
  setItem(options = {}) {
    const { key, value } = options;
    const namespacedKey = this.buildNamespace(key);
    const serialisedValue = toJson(value);

    assert('You need to specify a key', isPresent(namespacedKey));

    get(this, 'storage').set(namespacedKey, serialisedValue);
  },

  /*
   * Return the value of a key from
   * the store.
   *
   * @method getItem
   *
   * @param {String} key
   *   A string containing the name of the key you want to retrieve the value of.
   *
   * @return {Object}
   *   An object containing the value of the key. If the key does not exist, null is returned.
   */
  getItem(options = {}) {
    const { key } = options;
    const namespacedKey = this.buildNamespace(key);

    assert('You need to specify a key', isPresent(namespacedKey));

    const serialisedValue = get(this, 'storage').get(namespacedKey);
    return toObject(serialisedValue);
  },

  /*
   * Remove a key from the store.
   *
   * @method removeItem
   *
   * @param {String} key
   *   A string containing the name of the key you want to remove.
   */
  removeItem(options = {}) {
    const { key } = options;
    const namespacedKey = this.buildNamespace(key);

    assert('You need to specify a key', isPresent(namespacedKey));

    get(this, 'storage').delete(namespacedKey);
  },

  /*
   * Return the list of keys from the
   * store.
   *
   * @method keys
   *
   * @param {Object} options
   *   Set of options to use when retrieving the key.
   *
   * @return {Array}
   *   An array of sorted keys from the store.
   */
  keys({ options } = {}) {
    const keys = [];
    const _options = assign({}, {
      global: false
    }, options || {});

    get(this, 'storage').forEach((value, key) => {
      if (_options.global || this.isNamespacedKey(key)) {
        keys.push(key);
      }
    });

    return keys.sort();
  },

  /*
   * Remove all the keys from the store.
   *
   * @method clear
   *
   * @param {Object} options
   *   Set of options to use when retrieving the key.
   */
  clear({ options } = {}) {
    const storage = get(this, 'storage');

    this.keys(options).forEach(function(key) {
      storage.delete(key);
    });
  }
});
