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

  imgSrc: Ember.computed('message', function() {
    switch(this.get('message')) {
      case 'new-attendee:hello':
        return "/assets/images/hello.gif";
      case 'new-attendee:no-name':
        return "/assets/images/no-name.gif";
      case 'new-attendee:wrong-secret':
        return "/assets/images/wrong-secret.gif";
      case 'new-attendee:success':
        return "/assets/images/success.gif";
      default:
        return null;
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
