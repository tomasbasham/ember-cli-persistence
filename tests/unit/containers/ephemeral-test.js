import Ember from 'ember';
import { moduleFor, test } from 'ember-qunit';
import Sinon from 'sinon';

const {
  get,
  set
} = Ember;

let sandbox;

moduleFor('container:ephemeral', 'Unit | Container | ephemeral', {
  beforeEach() {
    sandbox = Sinon.sandbox.create();
  },

  afterEach() {
    sandbox.restore();
  }
});

test('storage is a map of key value pairs', function(assert) {
  let container = this.subject();

  const storage = get(container, 'storage');
  set(storage, 'captain', 'Jean-Luc Picard');

  assert.equal(get(storage, 'captain'), 'Jean-Luc Picard');
});

test('#setItem calls set with the correct arguments', function(assert) {
  let container = this.subject();

  const storage = get(container, 'storage');
  const stub = sandbox.stub(storage, 'set');

  container.setItem({ key: 'captain', value: 'Jean-Luc Picard' });
  assert.ok(stub.calledWith('captain', '"Jean-Luc Picard"'));
});

test('#getItem calls get with the correct arguments', function(assert) {
  let container = this.subject();

  const storage = get(container, 'storage');
  const stub = sandbox.stub(storage, 'get');

  container.getItem({ key: 'captain' });
  assert.ok(stub.calledWith('captain'));
});

test('#removeItem calls delete with the correct arguments', function(assert) {
  let container = this.subject();

  const storage = get(container, 'storage');
  const stub = sandbox.stub(storage, 'delete');

  container.removeItem({ key: 'captain' });
  assert.ok(stub.calledWith('captain'));
});

test('#key calls forEach', function(assert) {
  let container = this.subject();

  const storage = get(container, 'storage');
  const stub = sandbox.stub(storage, 'forEach');

  container.key({ index: 0 });
  assert.ok(stub.called);
});

test('#keys calls forEach', function(assert) {
  let container = this.subject();

  const storage = get(container, 'storage');
  const stub = sandbox.stub(storage, 'forEach');

  container.keys();
  assert.ok(stub.called);
});

test('#clear calls delete with the correct arguments', function(assert) {
  let container = this.subject();

  const storage = get(container, 'storage');
  const stub = sandbox.stub(storage, 'delete');

  container.setItem({ key: 'captain', value: 'Jean-Luc Picard' });
  container.clear();

  assert.ok(stub.calledWith('captain'));
});

test('#length calls forEach', function(assert) {
  let container = this.subject();

  const storage = get(container, 'storage');
  const stub = sandbox.stub(storage, 'forEach');

  container.length();
  assert.ok(stub.called);
});
