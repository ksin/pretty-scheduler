import Ember from 'ember';

export default Ember.Component.extend({
  message: null,
  helloText: null,
  hasMessage: Ember.computed.bool('message'),

  // temporary | should validate on server, obviously.
  isValidSecret: Ember.computed('secret,event.secret', function() {
    return Ember.isBlank(this.get('event.secret')) || (this.get('secret') === this.get('event.secret'));
  }),

  isValidAttendee: Ember.computed('name,secret,isValidSecret', function() {
    if (!Ember.isPresent(this.get('name'))) {
      this.set('message', 'no-name');
      return false;
    } else if (!this.get('isValidSecret')) {
      this.set('message', 'wrong-secret');
      return false;
    }
    return true;
  }),

  attendeeObject: Ember.computed('name,availableDates.[]', function() {
    return {
      name: this.get('name'),
      availableDates: this.get('availableDates') || [],
      event: this.get('event')
    };
  }),

  actions: {
    createAttendee() {
      this.set('message', null);
      if (this.get('isValidAttendee')) {
        this.sendAction('createAttendee', this.get('attendeeObject'));
      }
    },

    /**
      We only update helloText on focusOut
      rather than having it change based on
      the two way binding of 'name'. Thus, the
      form-message text doesn't change while typing.
    */
    focusOutNameInput(name) {
      if (Ember.isPresent(name)) {
        this.set('message', 'hello');
        this.set('helloText', `Hi there, ${name}!`);
      } else {
        this.set('message', null);
        this.set('helloText', null);
      }
      this.set('name', name);
    },

    updateAvailableDates(availableDates) {
      this.set('availableDates', availableDates);
    }
  }
});
