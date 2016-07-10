/* globals moment */
import { test } from 'ember-qunit';
import { module } from 'qunit';
import containsDate from 'pretty-scheduler/utils/contains-date';

module('Unit | utils | containsDate');

test('returns true if date is in collection', function(assert) {
  let dates = [moment("2014-02-05", "YYYY-MM-DD", true)];
  let date = moment("2014-02-05", "YYYY-MM-DD", true);
  assert.ok(containsDate(dates, date));
});

test('returns false if date is not in collection', function(assert) {
  let dates = [];
  let date = moment("2014-02-05", "YYYY-MM-DD", true);
  assert.ok(!containsDate(dates, date));
});
