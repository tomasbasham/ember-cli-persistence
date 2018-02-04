import EmberError from '@ember/error';

import Base from 'ember-cli-persistence/containers/base';
import supportsPersistence from 'ember-cli-persistence/utils/supports-persistence';

import { computed } from '@ember/object';

export default Base.extend({

  /*
   * Grab the localStorage object
   * from the window if it exists.
   *
   * @type {Storage}
   */
  storage: computed({
    get() {
      if (!supportsPersistence('localStorage')) {
        EmberError('localStorage is unavailable in this environment');
      }

      return window.localStorage;
    }
  }).readOnly()
});
