import { moduleForModel, test } from 'ember-qunit';

moduleForModel('event', 'Unit | Model | event', {
  needs: ['model:attendee']
});

test('it exists', function(assert) {
  let model = this.subject({
    startDate: new Date(2016, 1, 1),
    endDate: new Date(2016, 3, 1)
  });
  assert.deepEqual(model.get('months'), [1,2,3], "counts months from startDate to endDate");
});
