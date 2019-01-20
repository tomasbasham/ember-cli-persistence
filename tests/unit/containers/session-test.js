/* global Storage */

import Sinon from 'sinon';

import { get } from '@ember/object';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

let sandbox;

module('Unit | Container | session', function(hooks) {
  setupTest(hooks);

  hooks.beforeEach(function() {
    sandbox = Sinon.sandbox.create();
  });

  hooks.afterEach(function() {
    sandbox.restore();
  });

  test('storage is a sessionStorage object', function(assert) {
    let container = this.owner.lookup('container:session');
    const storage = get(container, 'storage');
    assert.ok(storage instanceof Storage);
  });

  test('#setItem calls setItem with the correct arguments', function(assert) {
    let container = this.owner.lookup('container:session');

    const storage = get(container, 'storage');
    const stub = sandbox.stub(storage, 'setItem');

    container.setItem({ key: 'captain', value: 'Jean-Luc Picard' });
    assert.ok(stub.calledWith('captain', '"Jean-Luc Picard"'));
  });

  test('#getItem calls getItem with the correct arguments', function(assert) {
    let container = this.owner.lookup('container:session');

    const storage = get(container, 'storage');
    const stub = sandbox.stub(storage, 'getItem');

    container.getItem({ key: 'captain' });
    assert.ok(stub.calledWith('captain'));
  });

  test('#removeItem calls removeItem with the correct arguments', function(assert) {
    let container = this.owner.lookup('container:session');

    const storage = get(container, 'storage');
    const stub = sandbox.stub(storage, 'removeItem');

    container.removeItem({ key: 'captain' });
    assert.ok(stub.calledWith('captain'));
  });

  test('#key calls keys with correct arguments', function(assert) {
    let container = this.owner.lookup('container:session');

    const storage = get(container, 'storage');
    const stub = sandbox.stub(Object, 'keys').callsFake(function() {
      return [];
    });

    container.key({ index: 0 });
    assert.ok(stub.calledWith(storage));
  });

  test('#keys calls keys with correct arguments', function(assert) {
    let container = this.owner.lookup('container:session');

    const storage = get(container, 'storage');
    const stub = sandbox.stub(Object, 'keys').callsFake(function() {
      return [];
    });

    container.keys();
    assert.ok(stub.calledWith(storage));
  });

  test('#clear calls removeItem with the correct arguments', function(assert) {
    let container = this.owner.lookup('container:session');

    const storage = get(container, 'storage');
    const stub = sandbox.stub(storage, 'removeItem');

    container.setItem({ key: 'captain', value: 'Jean-Luc Picard' });
    container.clear();

    assert.ok(stub.calledWith('captain'));
  });

  test('#length calls keys with correct arguments', function(assert) {
    let container = this.owner.lookup('container:session');

    const storage = get(container, 'storage');
    const stub = sandbox.stub(Object, 'keys').callsFake(function() {
      return [];
    });

    container.length();
    assert.ok(stub.calledWith(storage));
  });
});
