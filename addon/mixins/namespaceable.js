import Ember from 'ember';

const {
  computed,
  get,
  isPresent
} = Ember;

export default Ember.Mixin.create({

  /*
   * Default namespace for application
   * container keys.
   *
   * @type {String}
   */
  namespace: computed.alias('config.namespace'),

  /*
   * Prepend the namespace to the key
   * before using it as a storage
   * identifier.
   *
   * @method buildNamespace
   *
   * @param {String} key
   *   A string to prepend a namespace onto.
   *
   * @return {String}
   *   A namespaced key identifer.
   */
  buildNamespace(key) {
    const namespace = get(this, 'namespace');
    return isPresent(namespace) ? `${namespace}:${key}` : `${key}`;
  },

  /*
   * Determine whether the key has been
   * previously namespaced.
   *
   * @method isNamespacedKey
   *
   * @param {String} key
   *   A namespaced key
   *
   * @return {Boolean}
   *   True if the key was previously namespaced, otherwise false.
   */
  isNamespacedKey(key) {
    return `${key}`.indexOf(this.buildNamespace('')) === 0;
  }
});
