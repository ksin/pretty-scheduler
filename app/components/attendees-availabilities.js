import Ember from 'ember';

export default Ember.Component.extend({
  checking: "all",

  isCheckingAll: Ember.computed.equal('checking', "all"),
  isCheckingAttendee: Ember.computed.equal('checking.constructor.modelName', 'attendee'),

  actions: {
    checkAvailabilityFor(attendee) {
      this.set('checking', attendee);
    }
  }
});
