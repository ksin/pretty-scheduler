/* globals moment */
import moduleForIntegration from '../../helpers/module-for-integration';
import hbs from 'htmlbars-inline-precompile';
import { test } from 'ember-qunit';

moduleForIntegration('Integration | Component | calendar-day', {
  beforeEach() {
    this.set('startDate', moment.utc('2016-2-10'));
    this.set('endDate', moment.utc('2016-3-1'));
    this.set('date', moment.utc('2016-2-10'));
    this.render(hbs`
      {{calendar-day date=date startDate=startDate endDate=endDate}}
    `);
  }
});

test('renders a calendar day', function(assert) {
  assert.equal(this.$('.month-calendar__day').text().trim(), "10");
});

test('indicates if date is not a day type', function(assert) {
  this.set('date', "N/A");
  assert.ok(this.$('.month-calendar__day').hasClass("month-calendar__day--non"));
});

test('indicates if date is outside date range', function(assert) {
  this.set('date', moment.utc('2016-2-9'));
  assert.ok(this.$('.month-calendar__day').hasClass("month-calendar__day--out-range"));
});
