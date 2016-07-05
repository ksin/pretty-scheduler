import Ember from 'ember';

export default Ember.Component.extend({
  formMessage: null,
  helloText: null,
  hasMessage: Ember.computed.bool('formMessage'),

  // temporary | should validate on server, obviously.
  isValidSecret: Ember.computed('secret,event.secret', function() {
    return Ember.isBlank(this.get('event.secret')) || (this.get('secret') === this.get('event.secret'));
  }),

  isValidAttendee: Ember.computed('name,secret,isValidSecret', function() {
    if (Ember.isBlank(this.get('name'))) {
      this.set('formMessage', 'new-attendee:no-name');
      return false;
    } else if (!this.get('isValidSecret')) {
      this.set('formMessage', 'new-attendee:wrong-secret');
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

  submitIsSuccessful: Ember.computed.equal('formMessage','new-attendee:success'),
  shouldShowSubmit: Ember.computed.not('submitIsSuccessful'),

  actions: {
    createAttendee() {
      this.set('message', null);
      if (this.get('isValidAttendee')) {
        let result = this.get('createAttendee')(this.get('attendeeObject'));
        result.then(() => {
          this.set('formMessage', 'new-attendee:success');
        });
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
        this.set('formMessage', 'new-attendee:hello');
        this.set('helloText', name);
      } else {
        this.set('statusMessenger', null);
        this.set('helloText', null);
      }
      this.set('name', name);
    },

    updateAvailableDates(availableDates) {
      this.set('availableDates', availableDates);
    }
  }
});
