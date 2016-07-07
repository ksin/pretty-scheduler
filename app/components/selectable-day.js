import Ember from 'ember';
import CalendarDayComponent from './calendar-day';

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
    } else if (this.get('startDate') <= this.get('date') && this.get('date') <= this.get('endDate')) {
      return 'month-calendar__day--selectable';
    }
    return 'month-calendar__day--unselectable';
  }),

  selected: Ember.computed('selectedDates.[],date', function() {
    return this.get('selectedDates').contains(this.get('date'));
  })
});
