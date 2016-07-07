import Ember from 'ember';

const allAttendees =  Ember.Object.create({
  name: "All Attendees",
  availableDates: [],
  isAll: true
});

export default Ember.Component.extend({
  classNames: ['attendees-availabilities'],

  checking: allAttendees,
  allAttendees: allAttendees,
  isCheckingAll: Ember.computed.bool('checking.isAll'),

  actions: {
    checkAvailabilityFor(attendee) {
      this.set('checking', attendee);
    }
  }
});
