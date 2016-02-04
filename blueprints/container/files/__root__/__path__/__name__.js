import Base from 'ember-cli-persistence/containers/base';

export default Base.extend({

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
  setItem({ key, value }) {

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
  getItem({ key }) {

  },

  /*
   * Remove a key from the store.
   *
   * @method removeItem
   *
   * @param {String} key
   *   A string containing the name of the key you want to remove.
   */
  removeItem({ key }) {

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
  key({ index, options } = {}) {

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
  length({ options } = {}) {

  }
});
