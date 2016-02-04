import { toJson, toObject } from '../../../utils/object-transforms';
import { module, test } from 'qunit';

module('Unit | Utility | object transforms');

test('it converts an object into JSON', function(assert) {
  let result = toJson({ serial: 'Jean-Luc Picard' });
  assert.equal(result, '{"serial":"Jean-Luc Picard"}');
});

test('it converts a JSON string into an object', function(assert) {
  let result = toObject('{"serial":"Jean-Luc Picard"}');
  assert.deepEqual(result, { serial: 'Jean-Luc Picard' });
});

test('it recovers from an invalid JSON string', function(assert) {
  let result = toObject();
  assert.equal(result, null);
});
