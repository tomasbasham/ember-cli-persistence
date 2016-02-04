import Ember from 'ember';
import NamespaceableMixin from '../../../mixins/namespaceable';
import { module, test } from 'qunit';

const {
  set
} = Ember;

let namespace, config;

module('Unit | Mixin | namespaceable', {
  beforeEach() {
    namespace = 'enterprise';
    config = {
      namespace: namespace
    };
  }
});

test('it can build a namespaced key', function(assert) {
  let NamespaceableObject = Ember.Object.extend(NamespaceableMixin);
  let subject = NamespaceableObject.create({ config });

  set(subject, 'namespace', namespace);
  assert.equal(subject.buildNamespace('captain'), `${namespace}:captain`);
});

test('it can build a namespaced key without a namespace', function(assert) {
  let NamespaceableObject = Ember.Object.extend(NamespaceableMixin);
  let subject = NamespaceableObject.create();

  assert.equal(subject.buildNamespace('captain'), 'captain');
});

test('it can recognise a namespaced key', function(assert) {
  let NamespaceableObject = Ember.Object.extend(NamespaceableMixin);
  let subject = NamespaceableObject.create({ config });

  set(subject, 'namespace', namespace);
  assert.ok(subject.isNamespacedKey(`${namespace}:'captain'`));
});
