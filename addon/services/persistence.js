import Service from '@ember/service';

import Adaptable from 'ember-cli-adapter-pattern/mixins/adaptable';
import proxyToAdapter from 'ember-cli-adapter-pattern/utils/proxy-to-adapter';

import { getOwner } from '@ember/application';
import { A } from '@ember/array';
import { assert } from '@ember/debug';
import { getWithDefault, set } from '@ember/object';
import { on } from '@ember/object/evented';
import { dasherize } from '@ember/string';

export default Service.extend(Adaptable, {

  /*
   * Add a key to the store, or update
   * that key's value if it already
   * exists.
   *
   * @method setItem
   */
  setItem: proxyToAdapter('setItem'),

  /*
   * Return the value of a key from
   * the store.
   *
   * @method getItem
   */
  getItem: proxyToAdapter('getItem'),

  /*
   * Remove a key from the store.
   *
   * @method removeItem
   */
  removeItem: proxyToAdapter('removeItem'),

  /*
   * Return a key at a given index
   * in the store.
   *
   * @method key
   */
  key: proxyToAdapter('key'),

  /*
   * Return the list of keys from the
   * store.
   *
   * @method keys
   */
  keys: proxyToAdapter('keys'),

  /*
   * Remove all the keys from the store.
   *
   * @method clear
   */
  clear: proxyToAdapter('clear'),

  /*
   * Return the number of keys in the
   * store.
   *
   * @method length
   */
  length: proxyToAdapter('length'),

  /*
   * Fetch the adapter configuation and
   * ensure that we have a clean cache
   * of adapters.
   *
   * Further to this we register our
   * adapter classes with the option
   * to not instatiate them immediately.
   *
   * @method createAdapters
   * @on init
   */
  createAdapters: on('init', function() {
    const adapters = getWithDefault(this, 'config.persistence.containers', A());
    const owner = getOwner(this);

    // Containers should not be instantiated.
    owner.registerOptionsForType('ember-cli-persistence@container', { instantiate: false });
    owner.registerOptionsForType('container', { instantiate: false });

    set(this, '_adapters', {});
    set(this, 'context', {});

    this.activateAdapters(adapters);
  }),

  /*
   * Lookup adapters from the application
   * container.
   *
   * @method lookupAdapter
   *
   * @param {String} adapterName
   *   Name of the adapter.
   *
   * @return {Object}
   *   Uninstantiated adapter object.
   */
  _lookupAdapter(adapterName) {
    assert('Could not find container without a name', adapterName);

    const owner = getOwner(this);
    const dasherizedAdapterName = dasherize(adapterName);
    const localAdapter = owner.lookup(`ember-cli-persistence@container:${dasherizedAdapterName}`);
    const adapter = owner.lookup(`container:${dasherizedAdapterName}`);

    return adapter ? adapter : localAdapter;
  }
});
