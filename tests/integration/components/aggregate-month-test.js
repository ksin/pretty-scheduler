import moduleForIntegration from '../../helpers/module-for-integration';
import hbs from 'htmlbars-inline-precompile';
import { test } from 'ember-qunit';

moduleForIntegration('Integration | Component | aggregate-month', {
  beforeEach() {
    this.set('month', 1);
    this.set('startDate', new Date(2016, 1, 10));
    this.set('endDate', new Date(2016, 2, 1));
    this.set('dateFrequency', {
      [new Date(2016,1,10)]: 10,
      [new Date(2016,1,11)]: 7,
      [new Date(2016,1,12)]: 4,
      "max": 10
    });

    this.render(hbs`
      {{aggregate-month
          month=month
          startDate=startDate
          endDate=endDate
          dateFrequency=dateFrequency}}
    `);
  }
});

test('renders calendar month', function(assert) {
  assert.equal(this.$('.aggregate-month__heading').text(), "February 2016");
});

test('indicates frequency of day', function(assert) {
  assert.ok(this.$('.aggregate-day:contains(10)').hasClass('everyone'));
  assert.ok(this.$('.aggregate-day:contains(11)').hasClass('more'));
  assert.ok(this.$('.aggregate-day:contains(12)').hasClass('few'));
});
