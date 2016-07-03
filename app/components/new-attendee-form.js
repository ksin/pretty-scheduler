import Ember from 'ember';

export default Ember.Component.extend({
  // temporary | should validate on server, obviously.
  isValidSecret: Ember.computed('secret,event.secret', function() {
    return Ember.isBlank(this.get('event.secret')) || (this.get('secret') === this.get('event.secret'));
  }),

  isValidAttendee: Ember.computed('name,secret,isValidSecret', function() {
    return Ember.isPresent(this.get('name')) && this.get('isValidSecret');
  }),

  attendeeObject: Ember.computed('name,availableDates.[]', function() {
    return {
      name: this.get('name'),
      availableDates: this.get('availableDates') || [],
      event: this.get('event')
    };
  }),

  displayHelloMessage: Ember.computed.and('helloImg', 'helloText'),

  actions: {
    createAttendee() {
      if (this.get('isValidAttendee')) {
        this.sendAction('createAttendee', this.get('attendeeObject'));
      } else {
        debugger;
        console.log('Attendee is invalid. Implement a validation error.');
      }
    },

    focusOutNameInput(name) {
      let helloText, helloImg;
      if (Ember.isPresent(name)) {
        helloText = `Hi there, ${name}!`;
        helloImg = "http://i.giphy.com/26Fxy3Iz1ari8oytO.gif";
      } else {
        helloText, helloImg = null;
      }
      this.set('helloImg', helloImg);
      this.set('helloText', helloText);
      this.set('name', name);
    },

    updateAvailableDates(availableDates) {
      this.set('availableDates', availableDates);
    }
  }
});
