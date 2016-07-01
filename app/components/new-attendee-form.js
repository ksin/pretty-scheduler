import Ember from 'ember';

export default Ember.Component.extend({
  // temporary | should validate on server, obviously.
  isValidSecret: Ember.computed('secret,eventSecret', function() {
    return this.get('secret') === this.get('eventSecret');
  }),
  eventSecret: Ember.computed.readOnly('attendee.event.secret'),

  isValidAttendee: Ember.computed('attendee.name,secret,isValidSecret', function() {
    return Ember.isPresent(this.get('attendee.name')) &&
            Ember.isPresent(this.get('secret')) &&
            this.get('isValidSecret');
  }),

  actions: {
    createAttendee() {
      if (this.get('isValidAttendee')) {
        this.sendAction('createAttendee', this.get('attendee'));
      } else {
        console.log('Attendee is invalid. Implement a validation error.');
      }
    },

    focusOutNameInput(name) {
      let helloMessage = Ember.isPresent(name) ? `Hi there, ${name}!` : '';
      this.set('helloMessage', helloMessage);
      this.set('attendee.name', name);
    },

    updateAvailableDates(availableDates) {
      this.set('attendee.availableDates', availableDates);
    }
  }
});
