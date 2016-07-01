import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    let attendee = this.store.createRecord('attendee');
    this.store.findRecord('event', params.event_id).then((event) => {
      attendee.set('event', event);
    });
    return attendee;
  },

  actions: {
    createAttendee(attendee) {
      attendee.save();
    }
  }
});
