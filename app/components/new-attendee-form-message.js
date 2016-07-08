import Ember from 'ember';

export default Ember.Component.extend({
  formMessage: 'new-attendee:no-message',
  classNames: ['form-message'],
  classNameBindings: ['modifier'],

  modifier: Ember.computed('display', function() {
    return this.get('display').modifier;
  }),

  shouldDisplay: Ember.computed('formMessage', function() {
    return this.get('formMessage') !== 'new-attendee:no-message';
  }),

  display: Ember.computed('displays,formMessage', function() {
    return this.get('displays')[this.get('formMessage')];
  }),

  displays: Ember.computed('helloText', function() {
    return {
      'new-attendee:hello': {
        text: `Hi there, ${this.get('helloText')}!`,
        image: {
          src: "/assets/images/hello.gif",
          alt: "GIF of a dog jumping up and waving HI",
        },
        modifier: "form-message--hello"
      },
      'new-attendee:no-name': {
        text: "What's your name tho?",
        image: {
          src: "/assets/images/no-name.gif",
          alt: "GIF of a dog with fire in its eyes"
        },
        modifier: "form-message--no-name"
      },
      'new-attendee:wrong-secret': {
        text: 'You got the secret wrong!',
        image: {
          src: "/assets/images/wrong-secret.gif",
          alt: "GIF of a dog barking"
        },
        modifier: "form-message--wrong-secret"
      },
      'new-attendee:success': {
        text: 'BOO-YAH! Your dates are saved.',
        image: {
          src: "/assets/images/success.gif",
          alt: "GIF of two small round dogs giving each other a paw high five"
        },
        modifier: "form-message--success"
      },
      'new-attendee:no-message': {
        text: '',
        image: {
          src: "",
          alt: "No image shown"
        },
        modifier: ''
      }
    };
  })
});
