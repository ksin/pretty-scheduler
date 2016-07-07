import moduleForIntegration from '../../helpers/module-for-integration';
import hbs from 'htmlbars-inline-precompile';
import { test } from 'ember-qunit';

moduleForIntegration('Integration | Component | aggregate-day', {
  beforeEach() {
    this.set('startDate', new Date(2016, 1, 10));
    this.set('endDate', new Date(2016, 2, 1));
    this.set('dateFrequency', {
      [new Date(2016,1,10)]: 10,
      [new Date(2016,1,11)]: 7,
      [new Date(2016,1,12)]: 4,
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
  this.set('date', new Date(2016, 1, 10));
  assert.equal(this.$('.month-calendar__day--aggregate').text().trim(), "10");
});

test('renders frequency of date', function(assert) {
  this.set('date', new Date(2016, 1, 10));
  assert.ok(this.$('.month-calendar__day--aggregate').hasClass("month-calendar__day--everyone"));

  this.set('date', new Date(2016, 1, 11));
  assert.ok(this.$('.month-calendar__day--aggregate').hasClass("month-calendar__day--more"));

  this.set('date', new Date(2016, 1, 12));
  assert.ok(this.$('.month-calendar__day--aggregate').hasClass("month-calendar__day--few"));
});

test('indicates if date is unselectable due to being outside date range', function(assert) {
  this.set('date', new Date(2016, 1, 9));
  assert.ok(this.$('.month-calendar__day--aggregate').hasClass("month-calendar__day--unselectable"));
});

test('indicates if date is not a day type due to being outside date range', function(assert) {
  this.set('date', "N/A");
  assert.ok(this.$('.month-calendar__day--aggregate').hasClass("month-calendar__day--non"));
});

