/* globals moment */
import moduleForIntegration from '../../helpers/module-for-integration';
import hbs from 'htmlbars-inline-precompile';
import { test } from 'ember-qunit';

moduleForIntegration('Integration | Component | attendee-month', {
  beforeEach() {
    this.set('month', 1);
    this.set('startDate', moment.utc('2016-02-10'));
    this.set('endDate', moment.utc('2016-03-1'));
    this.set('availableDates', [ moment.utc('2016-02-10') ]);

    this.render(hbs`
      {{attendee-month
          month=month
          startDate=startDate
          endDate=endDate
          availableDates=availableDates}}
    `);
  }
});

test('renders calendar month', function(assert) {
  assert.equal(this.$('.month-calendar__heading').text().trim(), "February 2016");
});

test('indicates available day', function(assert) {
  assert.ok(this.$('.month-calendar__day:contains(10)').hasClass('month-calendar__day--available'));
  assert.ok(!this.$('.month-calendar__day:contains(11)').hasClass('month-calendar__day--available'), "Does not have available class");
});
