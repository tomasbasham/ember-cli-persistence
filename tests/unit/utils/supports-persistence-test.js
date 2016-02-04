import supportsPersistence from '../../../utils/supports-persistence';
import { module, test } from 'qunit';

module('Unit | Utility | supports persistence');

test('it determines that there is localStorage support', function(assert) {
  let result = supportsPersistence('localStorage');
  assert.ok(result);
});

test('it determines that there is sessionStorage support', function(assert) {
  let result = supportsPersistence('sessionStorage');
  assert.ok(result);
});

test('it determines that there is no awesomeStorage support', function(assert) {
  let result = supportsPersistence('awesomeStorage');
  assert.ok(!result);
});
