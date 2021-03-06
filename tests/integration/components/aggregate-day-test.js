/* globals moment */
import moduleForIntegration from '../../helpers/module-for-integration';
import hbs from 'htmlbars-inline-precompile';
import { test } from 'ember-qunit';

moduleForIntegration('Integration | Component | aggregate-day', {
  beforeEach() {
    this.set('startDate', moment.utc('2016-02-10'));
    this.set('endDate', moment.utc('2016-03-1'));
    this.set('dateFrequency', {
      [moment.utc('2016-02-10')]: 10,
      [moment.utc('2016-02-11')]: 7,
      [moment.utc('2016-02-12')]: 4,
      "max": 10
    });

    this.render(hbs`
      {{aggregate-day
          date=date
          startDate=startDate
          endDate=endDate
          dateFrequency=dateFrequency}}
    `);
  }
});

test('renders aggregate day', function(assert) {
  this.set('date', moment.utc('2016-02-10'));
  assert.equal(this.$('.month-calendar__day--aggregate').text().trim(), "10");
});

test('renders frequency of date', function(assert) {
  this.set('date', moment.utc('2016-02-10'));
  assert.ok(this.$('.month-calendar__day--aggregate').hasClass("month-calendar__day--everyone"));

  this.set('date', moment.utc('2016-02-11'));
  assert.ok(this.$('.month-calendar__day--aggregate').hasClass("month-calendar__day--more"));

  this.set('date', moment.utc('2016-02-12'));
  assert.ok(this.$('.month-calendar__day--aggregate').hasClass("month-calendar__day--few"));
});
