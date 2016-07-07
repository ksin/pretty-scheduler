import Ember from 'ember';

export default Ember.Component.extend({
  message: null,
  classNames: ['form-message'],
  classNameBindings: ['textModifier'],

  displayText: Ember.computed('message,helloText', function() {
    switch(this.get('message')) {
      case 'new-attendee:hello':
        return `Hi there, ${this.get('helloText')}!`;
      case 'new-attendee:no-name':
        return "What's your name tho?";
      case 'new-attendee:wrong-secret':
        return 'You got the secret wrong!';
      case 'new-attendee:success':
        return 'BOO-YAH! Your dates are saved.';
      default:
        return '';
    }
  }),

  image: Ember.computed('message', function() {
    switch(this.get('message')) {
      case 'new-attendee:hello':
        return { src: "/assets/images/hello.gif", alt: "GIF of a dog jumping up and waving HI" };
      case 'new-attendee:no-name':
        return { src: "/assets/images/no-name.gif", alt: "GIF of a dog with fire in its eyes" };
      case 'new-attendee:wrong-secret':
        return { src: "/assets/images/wrong-secret.gif", alt: "GIF of a dog barking" };
      case 'new-attendee:success':
        return { src: "/assets/images/success.gif", alt: "GIF of two small round dogs giving each other a paw high five" };
      default:
        return {};
    }
  }),

  textModifier: Ember.computed('message', function() {
    switch(this.get('message')) {
      case 'new-attendee:hello':
        return "form-message__text--hello";
      case 'new-attendee:no-name':
        return "form-message__text--no-name";
      case 'new-attendee:wrong-secret':
        return "form-message__text--wrong-secret";
      case 'new-attendee:success':
        return "form-message__text--success";
      default:
        return null;
    }
  })
});
