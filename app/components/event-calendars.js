import Ember from 'ember';

export default Ember.Component.extend({
  statusMessenger: Ember.inject.service(),
  isShowingNewAttendeeCalendar: true,

  hasAttendees: Ember.computed.notEmpty('event.attendees'),

  actions: {
    toggleCalendars() {
      this.get('statusMessenger').clearStatus();
      this.toggleProperty('isShowingNewAttendeeCalendar');
    },
    createAttendee(attendeeObject) {
      this.sendAction('createAttendee', attendeeObject);
    }
  }
});
