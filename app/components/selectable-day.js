import Ember from 'ember';
import CalendarDayComponent from './calendar-day';
import containsDate from '../utils/contains-date';

export default CalendarDayComponent.extend({
  classNameBindings: ['selectable', 'selected:month-calendar__day--selected'],

  click() {
    if (this.get('selectable') === 'month-calendar__day--selectable') {
      this.sendAction('clickedDate', this.get('date'));
    }
  },

  selectable: Ember.computed('startDate,endDate,isDateType,date', function() {
    if (!this.get('isDateType')) {
      return 'month-calendar__day--non';
    } else if (this.get('date').isBefore(this.get('startDate')) || this.get('date').isAfter(this.get('endDate'))) {
      return 'month-calendar__day--unselectable';
    }
    return 'month-calendar__day--selectable';
  }),

  selected: Ember.computed('selectedDates.[],date', function() {
    return containsDate(this.get('selectedDates'), this.get('date'));
  })
});
