import Ember from 'ember';
import NotFoundMixin from '../mixins/not-found';

export default Ember.Route.extend(NotFoundMixin, {
  statusMessenger: Ember.inject.service(),

  actions: {
    createAttendee(attendeeObject) {
      let attendee = this.store.createRecord('attendee', attendeeObject);
      attendee.save().then(() => {
        this.get('statusMessenger').set('status', 'new-attendee:success');
      });
    }
  }
});
