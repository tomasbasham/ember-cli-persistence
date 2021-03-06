import EmberObject from '@ember/object';

import NamespaceableMixin from 'ember-cli-persistence/mixins/namespaceable';

import { set } from '@ember/object';
import { module, test } from 'qunit';

let namespace, config;

module('Unit | Mixin | namespaceable', function(hooks) {
  hooks.beforeEach(function() {
    namespace = 'enterprise';
    config = {
      namespace: namespace
    };
  });

  test('it can build a namespaced key', function(assert) {
    let NamespaceableObject = EmberObject.extend(NamespaceableMixin);
    let subject = NamespaceableObject.create({ config });

    set(subject, 'namespace', namespace);
    assert.equal(subject.buildNamespace('captain'), `${namespace}:captain`);
  });

  test('it can build a namespaced key without a namespace', function(assert) {
    let NamespaceableObject = EmberObject.extend(NamespaceableMixin);
    let subject = NamespaceableObject.create();

    assert.equal(subject.buildNamespace('captain'), 'captain');
  });

  test('it can recognise a namespaced key', function(assert) {
    let NamespaceableObject = EmberObject.extend(NamespaceableMixin);
    let subject = NamespaceableObject.create({ config });

    set(subject, 'namespace', namespace);
    assert.ok(subject.isNamespacedKey(`${namespace}:'captain'`));
  });
});
