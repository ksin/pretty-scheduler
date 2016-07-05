import Ember from 'ember';
import NotFoundMixin from '../mixins/not-found';

export default Ember.Route.extend(NotFoundMixin, {
  actions: {
    createAttendee(attendeeObject) {
      let attendee = this.store.createRecord('attendee', attendeeObject);
      return attendee.save();
    }
  }
});
