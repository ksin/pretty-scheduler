/* globals moment */
import moduleForIntegration from '../../helpers/module-for-integration';
import hbs from 'htmlbars-inline-precompile';
import { test } from 'ember-qunit';

moduleForIntegration('Integration | Component | attendee-day', {
  beforeEach() {
    this.set('availableMoments', [
      moment.utc('2016-2-10')
    ]);
    this.render(hbs`
      {{attendee-day
          date=date
          availableMoments=availableMoments}}
    `);
  }
});

test('renders attendee day', function(assert) {
  this.set('date', moment.utc('2016-2-10'));
  assert.equal(this.$('.month-calendar__day').text().trim(), "10");
});

test('indicates if day is available', function(assert) {
  this.set('date', moment.utc('2016-2-11'));
  assert.ok(!this.$('.month-calendar__day').hasClass("month-calendar__day--available"));

  this.set('date', moment.utc('2016-2-10'));
  assert.ok(this.$('.month-calendar__day').hasClass("month-calendar__day--available"));
});
