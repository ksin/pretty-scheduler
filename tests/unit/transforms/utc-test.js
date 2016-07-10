/* globals moment */
import { test } from 'ember-qunit';
import { module } from 'qunit';
import UtcTransform from 'pretty-scheduler/transforms/utc';

module('Unit | Transforms | utc');

test('serializes date strings into ISO 8601', function(assert) {
  let transform = UtcTransform.create();
  let result = transform.serialize(moment("2014-02-05", "YYYY-MM-DD", true));
  assert.equal(result, "2014-02-05T05:00:00.000Z");
});

test('serialize returns null when given a null value', function(assert) {
  let transform = UtcTransform.create();
  let result = transform.serialize(null);
  assert.equal(result, null);
});

test('serialize returns null when given an undefined value', function(assert) {
  let transform = UtcTransform.create();
  let result = transform.serialize(undefined);
  assert.equal(result, null);
});

test('deserializes into a moment', function(assert) {
  let transform = UtcTransform.create();
  let result = transform.deserialize("2014-02-05T05:00:00.000Z");
  assert.ok(moment.isMoment(result));
});
