import Ember from 'ember';
import MonthCalendarComponent from './month-calendar';
import containsDate from '../utils/contains-date';

export default MonthCalendarComponent.extend({
  classNames: ['month-calendar--selectable'],

  selectedDates: Ember.computed(function() {
    return [];
  }),

  actions: {
    clickedDate(date) {
      if (containsDate(this.get('selectedDates'), date)) {
        this.get('selectedDates').removeObject(date);
      } else {
        this.get('selectedDates').pushObject(date);
      }
      this.sendAction('onDateClick', this.get('selectedDates'));
    }
  }
});
