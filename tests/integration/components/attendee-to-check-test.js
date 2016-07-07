import Ember from 'ember';
import moduleForIntegration from '../../helpers/module-for-integration';
import hbs from 'htmlbars-inline-precompile';
import { test } from 'ember-qunit';

moduleForIntegration('Integration | Component | attendee-to-check', {
  beforeEach() {
    this.set('delly', Ember.Object.create({ name: "Matthew Dellavedova" }));
    this.set('allAttendees', Ember.Object.create({
      name: "All Attendees",
      availableDates: [],
      isAll: true
    }));
    this.render(hbs`
      {{attendee-to-check checking=checking attendee=attendee}}
    `);
  }
});

test("renders 'All attendees' when the attendee to check is 'all'", function(assert) {
  this.set('attendee', this.get('allAttendees'));
  assert.equal(this.$('.attendee-to-check').text().trim(), "All Attendees");
  assert.ok(this.$('.attendee-to-check').hasClass("attendee-to-check__all"));
});

test("renders an attendee", function(assert) {
  this.set('attendee', this.get('delly'));
  assert.equal(this.$('.attendee-to-check').text().trim(), "Matthew Dellavedova");
  assert.ok(this.$('.attendee-to-check').hasClass("attendee-to-check__attendees"));
});

test("indicates if attendee is being checked", function(assert) {
  this.set('attendee', this.get('delly'));
  assert.ok(!this.$('.attendee-to-check').hasClass("attendee-to-check__attendees--checking"));
  this.set('checking', this.get('delly'));
  assert.ok(this.$('.attendee-to-check').hasClass("attendee-to-check__attendees--checking"));
});
