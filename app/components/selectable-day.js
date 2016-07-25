import Ember from 'ember';
import CalendarDayComponent from './calendar-day';
import containsDate from '../utils/contains-date';

export default CalendarDayComponent.extend({
  classNameBindings: ['selectable:month-calendar__day--selectable', 'selected:month-calendar__day--selected'],

  click() {
    if (this.get('selectable')) {
      this.sendAction('clickedDate', this.get('date'));
    }
  },

  selectable: Ember.computed.reads('inRange'),

  selected: Ember.computed('selectedDates.[],date', function() {
    return containsDate(this.get('selectedDates'), this.get('date'));
  })
});
