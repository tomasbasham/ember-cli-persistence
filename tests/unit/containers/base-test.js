import Sinon from 'sinon';
import { moduleFor, test } from 'ember-qunit';

let sandbox;

moduleFor('container:base', 'Unit | Container | base', {
  beforeEach() {
    sandbox = Sinon.sandbox.create();
  },

  afterEach() {
    sandbox.restore();
  }
});

test('it implements setItem', function(assert) {
  let container = this.subject();

  const spy = sandbox.stub(container, 'setItem').callsFake(function() {
    return true;
  });

  container.setItem();
  assert.ok(spy.called);
});

test('it implements getItem', function(assert) {
  let container = this.subject();

  const spy = sandbox.stub(container, 'getItem').callsFake(function() {
    return true;
  });

  container.getItem();
  assert.ok(spy.called);
});

test('it implements removeItem', function(assert) {
  let container = this.subject();

  const spy = sandbox.stub(container, 'removeItem').callsFake(function() {
    return true;
  });

  container.removeItem();
  assert.ok(spy.called);
});

test('it implements key', function(assert) {
  let container = this.subject();

  const spy = sandbox.stub(container, 'key').callsFake(function() {
    return true;
  });

  container.key();
  assert.ok(spy.called);
});

test('it implements keys', function(assert) {
  let container = this.subject();

  const spy = sandbox.stub(container, 'keys').callsFake(function() {
    return true;
  });

  container.keys();
  assert.ok(spy.called);
});

test('it implements clear', function(assert) {
  let container = this.subject();

  const spy = sandbox.stub(container, 'clear').callsFake(function() {
    return true;
  });

  container.clear();
  assert.ok(spy.called);
});

test('it implements length', function(assert) {
  let container = this.subject();

  const spy = sandbox.stub(container, 'length').callsFake(function() {
    return true;
  });

  container.length();
  assert.ok(spy.called);
});
