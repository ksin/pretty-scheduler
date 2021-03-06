/* globals moment */
import moduleForIntegration from '../../helpers/module-for-integration';
import hbs from 'htmlbars-inline-precompile';
import { test } from 'ember-qunit';

moduleForIntegration('Integration | Component | aggregate-month', {
  beforeEach() {
    this.set('month', 1);
    this.set('startDate', moment.utc('2016-02-10'));
    this.set('endDate', moment.utc('2016-03-01'));
    this.set('dateFrequency', {
      [moment.utc('2016-02-10')]: 10,
      [moment.utc('2016-02-11')]: 7,
      [moment.utc('2016-02-12')]: 4,
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
  assert.equal(this.$('.month-calendar__heading').text().trim(), "February 2016");
});

test('indicates frequency of day', function(assert) {
  assert.ok(this.$('.month-calendar__day--aggregate:contains(10)').hasClass('month-calendar__day--everyone'));
  assert.ok(this.$('.month-calendar__day--aggregate:contains(11)').hasClass('month-calendar__day--more'));
  assert.ok(this.$('.month-calendar__day--aggregate:contains(12)').hasClass('month-calendar__day--few'));
});
