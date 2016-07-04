import Ember from 'ember';
import CalendarDayComponent from './calendar-day';

export default CalendarDayComponent.extend({
  classNameBindings: ['frequency', 'isDateType::month-calendar__day--non'],

  percentageOfMaxFrequency: Ember.computed('dateFrequency,date', function() {
    let dateFrequency = this.get('dateFrequency');
    let max = dateFrequency['max'];
    let frequencyOfDate = dateFrequency[this.get('date')];
    return frequencyOfDate / max;
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
  })
});
