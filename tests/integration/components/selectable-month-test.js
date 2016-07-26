/* globals moment */
import moduleForIntegration from '../../helpers/module-for-integration';
import hbs from 'htmlbars-inline-precompile';
import { test } from 'ember-qunit';

moduleForIntegration('Integration | Component | selectable-month', {
  beforeEach() {
    this.set('month', 1);
    this.set('startDate', moment.utc('2016-02-10'));
    this.set('endDate', moment.utc('2016-03-1'));
    this.set('updateDatesCalled', 0);
    this.on('updateDates', function(dates) {
      this.set('dates', dates);
      this.set('updateDatesCalled', this.get('updateDatesCalled') + 1);
    });
    this.render(hbs`
      {{selectable-month
          month=month
          startDate=startDate
          endDate=endDate
          onDateClick="updateDates"}}
    `);
  }
});

test('renders calendar month', function(assert) {
  assert.equal(this.$('.month-calendar__heading').text().trim(), "February 2016");
});

test('only dates within startDate and endDate range are selectable', function(assert) {
  assert.ok(this.$('.month-calendar__day:contains(11)').hasClass('month-calendar__day--selectable'));
  assert.ok(this.$('.month-calendar__day:contains(9)').hasClass('month-calendar__day--out-range'));
});

test('clicking selectable date', function(assert) {
  this.$('.month-calendar__day:contains(11)').click();

  assert.ok(this.get('dates')[0].isSame(moment.utc('2016-02-11')), "sends 'onDateClick' with added date");
  assert.ok(this.$('.month-calendar__day:contains(11)').hasClass('month-calendar__day--selected'), "adds 'selected' class on calendar day");

  this.$('.month-calendar__day:contains(11)').click();

  assert.deepEqual(this.get('dates'), [], "sends 'onDateClick' with removed date");
  assert.ok(!this.$('.month-calendar__day:contains(11)').hasClass('selected'), "removes 'selected' class from calendar day");
  assert.equal(this.get('updateDatesCalled'), 2, "Sent 'onDateClick' for each date click");
});

test('clicking unselectable date', function(assert) {
  this.$('.month-calendar__day--non').click();
  assert.equal(this.get('updateDatesCalled'), 0, "Doesn't send 'onDateClick'");
  this.$('.month-calendar__day--out-range:contains(9)').click();
  assert.equal(this.get('updateDatesCalled'), 0, "Doesn't send 'onDateClick'");
});
