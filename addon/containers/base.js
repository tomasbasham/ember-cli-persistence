import EmberObject from '@ember/object';

import Namespaceable from 'ember-cli-persistence/mixins/namespaceable';
import { toJson, toObject } from 'ember-cli-persistence/utils/object-transforms';

import { assert } from '@ember/debug';
import { get } from '@ember/object';
import { merge } from '@ember/polyfills';
import { isPresent } from '@ember/utils';

export default EmberObject.extend(Namespaceable, {

  /*
   * The specific storage object for
   * this adapter. These will most
   * likely exist on the root most
   * object of the environment (i.e.
   * window).
   *
   * @type {Object}
   */
  storage: null,

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

    get(this, 'storage').setItem(namespacedKey, serialisedValue);
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

    const serialisedValue = get(this, 'storage').getItem(namespacedKey);
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

    get(this, 'storage').removeItem(namespacedKey);
  },

  /*
   * Return a key at a given index
   * in the store.
   *
   * @method key
   *
   * @param {Number} index
   *   The index of the key in the store.
   *
   * @param {Object} options
   *   Set of options to use when retrieving the key.
   *
   * @return {String}
   *   The name of the key at a given index in the store. If the index is invalid, null is returned.
   */
  key(options = {}) {
    const { index } = options;
    assert('You need to specify an index', isPresent(index));
    return this.keys(options)[index] || null;
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
  keys(options = {}) {
    const storage = get(this, 'storage');
    const _options = merge({ global: false }, options || {});

    return Object.keys(storage).filter((key) => {
      return _options.global || this.isNamespacedKey(key);
    }).sort();
  },

  /*
   * Remove all the keys from the store.
   *
   * @method clear
   *
   * @param {Object} options
   *   Set of options to use when retrieving the key.
   */
  clear(options = {}) {
    const storage = get(this, 'storage');

    this.keys(options).forEach(function(key) {
      storage.removeItem(key);
    });
  },

  /*
   * Return the number of keys in the
   * store.
   *
   * @method length
   *
   * @param {Object} options
   *   Set of options to use when retrieving the key.
   *
   * @return {Number}
   *   The number of keys in the store.
   */
  length(options = {}) {
    return this.keys(options).length;
  }
});
