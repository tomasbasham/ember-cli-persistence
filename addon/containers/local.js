import Ember from 'ember';
import Base from 'ember-cli-persistence/containers/base';
import supportsPersistence from 'ember-cli-persistence/utils/supports-persistence';

const {
  computed
} = Ember;

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
        Ember.Error('localStorage is unavailable in this environment');
      }

      return window.localStorage;
    }
  }).readOnly()
});
