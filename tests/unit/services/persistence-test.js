import { moduleFor, test } from 'ember-qunit';
import Sinon from 'sinon';

let sandbox;

moduleFor('service:persistence', 'Unit | Service | persistence', {
  needs: [
    'ember-cli-persistence@container:ephemeral',
    'ember-cli-persistence@container:local',
    'ember-cli-persistence@container:session'
  ],

  beforeEach() {
    sandbox = Sinon.sandbox.create();
  },

  afterEach() {
    sandbox.restore();
  }
});

test('it registers configured containers', function(assert) {
  let service = this.subject();
  assert.ok(service);
});

test('it implements standard contracts', function(assert) {
  let service = this.subject();

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
