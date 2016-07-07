import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['new-attendee'],

  availableDates: Ember.computed(function() {
    return [];
  }),

  formMessage: 'new-attendee:no-message',
  helloText: null,

  // temporary | should validate on server, obviously.
  isValidSecret: Ember.computed('secret,event.secret', function() {
    return Ember.isBlank(this.get('event.secret')) || (this.get('secret') === this.get('event.secret'));
  }),

  isValidAttendee: Ember.computed('name,isValidSecret', function() {
    return Ember.isPresent(this.get('name')) &&
            this.get('isValidSecret');
  }),

  setValidationErrors() {
    if (Ember.isBlank(this.get('name'))) {
      this.set('formMessage', 'new-attendee:no-name');
    } else if (!this.get('isValidSecret')) {
      this.set('formMessage', 'new-attendee:wrong-secret');
    } else {
      this.set('formMessage', 'new-attendee:no-message');
    }
  },

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
      if (this.get('isValidAttendee')) {
        let result = this.get('createAttendee')(this.get('attendeeObject'));
        result.then(() => {
          this.set('formMessage', 'new-attendee:success');
        });
      } else {
        this.setValidationErrors();
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
        this.set('formMessage', 'new-attendee:no-message');
        this.set('helloText', null);
      }
      this.set('name', name);
    },

    updateAvailableDates(availableDates) {
      this.set('availableDates', this.get('availableDates').concat(availableDates).uniq());
    }
  }
});
