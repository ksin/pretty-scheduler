import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['month-calendar__day', 'month-calendar__day--aggregate'],
  classNameBindings: ['frequency'],

  percentageOfMaxFrequency: Ember.computed('dateFrequency,date', function() {
    let dateFrequency = this.get('dateFrequency');
    let max = dateFrequency['max'];
    let frequencyOfDate = dateFrequency[this.get('date')];
    return frequencyOfDate / max;
  }),

  frequency: Ember.computed('percentageOfMaxFrequency', function() {
    let percent = this.get('percentageOfMaxFrequency');
    if (percent === 1) {
      return "everyone";
    } else if (percent > 0.5) {
      return "more";
    } else if (percent > 0.0) {
      return "few";
    }
  }),

  displayDate: Ember.computed('date', function() {
    let date = this.get('date');
    if (Ember.typeOf(date) === 'date') {
      return this.get('date').getDate();
    }
  })
});
