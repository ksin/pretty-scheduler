import Ember from 'ember';

export default Ember.Component.extend({
  indicateNoValue: false,
  noValueClass: "",
  classNames: ['line-input'],

  actions: {
    focusOut(value) {
      if(this.get('indicateNoValue') && Ember.isBlank(value)) {
        this.set('noValueClass', "line-input__input--no-value");
      } else {
        this.set('noValueClass', "");
      }
      this.sendAction('focusOut', value);
    }
  }
});
