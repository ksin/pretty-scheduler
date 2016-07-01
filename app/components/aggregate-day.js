import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['aggregate-day'],

  displayDate: Ember.computed('date', function() {
    let date = this.get('date');
    if (Ember.typeOf(date) === 'date') {
      return this.get('date').getDate();
    }
  })
});
