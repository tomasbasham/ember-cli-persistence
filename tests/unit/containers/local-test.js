/* global Storage */

import Sinon from 'sinon';

import { get } from '@ember/object';
import { moduleFor, test } from 'ember-qunit';

let sandbox;

moduleFor('container:local', 'Unit | Container | local', {
  beforeEach() {
    sandbox = Sinon.sandbox.create();
  },

  afterEach() {
    sandbox.restore();
  }
});

test('storage is a localStorage object', function(assert) {
  let container = this.subject();
  const storage = get(container, 'storage');
  assert.ok(storage instanceof Storage);
});

test('#setItem calls setItem with the correct arguments', function(assert) {
  let container = this.subject();

  const storage = get(container, 'storage');
  const stub = sandbox.stub(storage, 'setItem');

  container.setItem({ key: 'captain', value: 'Jean-Luc Picard' });
  assert.ok(stub.calledWith('captain', '"Jean-Luc Picard"'));
});

test('#getItem calls getItem with the correct arguments', function(assert) {
  let container = this.subject();

  const storage = get(container, 'storage');
  const stub = sandbox.stub(storage, 'getItem');

  container.getItem({ key: 'captain' });
  assert.ok(stub.calledWith('captain'));
});

test('#removeItem calls removeItem with the correct arguments', function(assert) {
  let container = this.subject();

  const storage = get(container, 'storage');
  const stub = sandbox.stub(storage, 'removeItem');

  container.removeItem({ key: 'captain' });
  assert.ok(stub.calledWith('captain'));
});

test('#key calls keys with correct arguments', function(assert) {
  let container = this.subject();

  const storage = get(container, 'storage');
  const stub = sandbox.stub(Object, 'keys', function() {
    return [];
  });

  container.key({ index: 0 });
  assert.ok(stub.calledWith(storage));
});

test('#keys calls keys with correct arguments', function(assert) {
  let container = this.subject();

  const storage = get(container, 'storage');
  const stub = sandbox.stub(Object, 'keys', function() {
    return [];
  });

  container.keys();
  assert.ok(stub.calledWith(storage));
});

test('#clear calls removeItem with the correct arguments', function(assert) {
  let container = this.subject();

  const storage = get(container, 'storage');
  const stub = sandbox.stub(storage, 'removeItem');

  container.setItem({ key: 'captain', value: 'Jean-Luc Picard' });
  container.clear();

  assert.ok(stub.calledWith('captain'));
});

test('#length calls keys with correct arguments', function(assert) {
  let container = this.subject();

  const storage = get(container, 'storage');
  const stub = sandbox.stub(Object, 'keys', function() {
    return [];
  });

  container.length();
  assert.ok(stub.calledWith(storage));
});
