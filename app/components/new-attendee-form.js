import Ember from 'ember';

export default Ember.Component.extend({
  // temporary | should validate on server, obviously.
  isValidSecret: Ember.computed('secret,event.secret', function() {
    return this.get('secret') === this.get('event.secret');
  }),

  isValidAttendee: Ember.computed('name,secret,isValidSecret', function() {
    return Ember.isPresent(this.get('name')) &&
            Ember.isPresent(this.get('secret')) &&
            this.get('isValidSecret');
  }),

  attendeeObject: Ember.computed('name,availableDates.[]', function() {
    return {
      name: this.get('name'),
      availableDates: this.get('availableDates'),
      event: this.get('event')
    };
  }),

  actions: {
    createAttendee() {
      if (this.get('isValidAttendee')) {
        this.sendAction('createAttendee', this.get('attendeeObject'));
      } else {
        console.log('Attendee is invalid. Implement a validation error.');
      }
    },

    focusOutNameInput(name) {
      let helloMessage = Ember.isPresent(name) ? `Hi there, ${name}!` : '';
      this.set('helloMessage', helloMessage);
      this.set('name', name);
    },

    updateAvailableDates(availableDates) {
      this.set('availableDates', availableDates);
    }
  }
});
