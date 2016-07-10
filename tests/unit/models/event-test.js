/* globals moment */
import { moduleForModel, test } from 'ember-qunit';

moduleForModel('event', 'Unit | Model | event', {
  needs: ['model:attendee']
});

test('it exists', function(assert) {
  let model = this.subject({
    startDate: moment.utc('2016-2-1'),
    endDate: moment.utc('2016-4-1')
  });
  assert.deepEqual(model.get('months'), [1,2,3], "counts months from startDate to endDate");
});
