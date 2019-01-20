import Sinon from 'sinon';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

let sandbox;

module('Unit | Service | persistence', function(hooks) {
  setupTest(hooks);

  hooks.beforeEach(function() {
    sandbox = Sinon.sandbox.create();
  });

  hooks.afterEach(function() {
    sandbox.restore();
  });

  test('it registers configured containers', function(assert) {
    let service = this.owner.lookup('service:persistence');
    assert.ok(service);
  });

  test('it implements standard contracts', function(assert) {
    let service = this.owner.lookup('service:persistence');

    const spy = sandbox.spy(service, 'invoke');
    const expectedContracts = ['setItem', 'getItem', 'removeItem', 'key', 'keys', 'clear', 'length'];

    expectedContracts.forEach(function(contractName) {
      service[contractName].call(service, {
        key: 'captain', // Necessary for setItem.
        value: 'Jean-Luc Picard', // Necessary for setItem.
        index: 0 // Necessary for key.
      });
    });

    assert.equal(spy.callCount, 7);
  });
});
