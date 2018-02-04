import EmberError from '@ember/error';

import Base from 'ember-cli-persistence/containers/base';
import supportsPersistence from 'ember-cli-persistence/utils/supports-persistence';

import { computed } from '@ember/object';

export default Base.extend({

  /*
   * Grab the sessionStorage object
   * from the window if it exists.
   *
   * @type {Storage}
   */
  storage: computed({
    get() {
      if (!supportsPersistence('sessionStorage')) {
        EmberError('sessionStorage is unavailable in this environment');
      }

      return window.sessionStorage;
    }
  }).readOnly()
});
