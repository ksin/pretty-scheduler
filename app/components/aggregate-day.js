import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['month-calendar__day'],
  classNameBindings: ['frequency', 'isDateType::month-calendar__day--non'],

  percentageOfMaxFrequency: Ember.computed('dateFrequency,date', function() {
    let dateFrequency = this.get('dateFrequency');
    let max = dateFrequency['max'];
    let frequencyOfDate = dateFrequency[this.get('date')];
    return frequencyOfDate / max;
  }),

  isDateType: Ember.computed('date', function() {
    return Ember.typeOf(this.get('date')) === 'date';
  }),

  frequency: Ember.computed('percentageOfMaxFrequency', function() {
    let percent = this.get('percentageOfMaxFrequency');
    if (percent === 1) {
      return "month-calendar__day--everyone";
    } else if (percent > 0.5) {
      return "month-calendar__day--more";
    } else if (percent > 0) {
      return "month-calendar__day--few";
    }
  }),

  displayDate: Ember.computed('date,isDateType', function() {
    if (this.get('isDateType')) {
      return this.get('date').getDate();
    }
  })
});
