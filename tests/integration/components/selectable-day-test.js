/* globals moment */
import moduleForIntegration from '../../helpers/module-for-integration';
import hbs from 'htmlbars-inline-precompile';
import { test } from 'ember-qunit';

moduleForIntegration('Integration | Component | selectable-day', {
  beforeEach() {
    this.set('sentDate', null);
    this.set('startDate', moment('2016-2-10'));
    this.set('endDate', moment('2016-3-1'));
    this.set('selectedDates', []);
    this.on('clickedDate', function(date) {
      this.set('sentDate', date);
    });

    this.render(hbs`
      {{selectable-day
          date=date
          startDate=startDate
          endDate=endDate
          selectedDates=selectedDates
          clickedDate="clickedDate"}}
    `);
  }
});

test('renders selectable day', function(assert) {
  this.set('date', moment('2016-2-10'));
  assert.equal(this.$('.month-calendar__day').text().trim(), "10");
});

test('indicates if date is selectable', function(assert) {
  this.set('date', moment('2016-2-10'));
  assert.ok(this.$('.month-calendar__day').hasClass("month-calendar__day--selectable"));
});

test('indicates if date is unselectable due to being outside date range', function(assert) {
  this.set('date', moment('2016-2-9'));
  assert.ok(this.$('.month-calendar__day').hasClass("month-calendar__day--unselectable"));
});

test('indicates if date is not a day type due to being outside date range', function(assert) {
  this.set('date', "N/A");
  assert.ok(this.$('.month-calendar__day').hasClass("month-calendar__day--non"));
});

test('indicates if date is part of selectedDates', function(assert) {
  let date = moment('2016-2-10');
  this.set('selectedDates', [date]);
  this.set('date', date);
  assert.ok(this.$('.month-calendar__day').hasClass("month-calendar__day--selected"));
});

test('sends clickedDate with the date if day is selectable', function(assert) {
  let date = moment('2016-2-10');
  this.set('date', date);
  this.$(".month-calendar__day--selectable").click();
  assert.equal(this.get('sentDate'), date);
});

test('does not send clickedDate with the date if day is unselectable', function(assert) {
  let date = moment('2016-2-9');
  this.set('date', date);
  this.$(".month-calendar__day--unselectable").click();
  assert.equal(this.get('sentDate'), null);
});
