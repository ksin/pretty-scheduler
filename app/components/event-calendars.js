import Ember from 'ember';

export default Ember.Component.extend({
  isShowingNewAttendeeCalendar: true,

  actions: {
    toggleCalendars() {
      this.toggleProperty('isShowingNewAttendeeCalendar');
    },
    createAttendee(attendeeObject) {
      this.sendAction('createAttendee', attendeeObject);
    }
  }
});
