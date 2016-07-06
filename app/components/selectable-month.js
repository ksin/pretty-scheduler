import Ember from 'ember';
import MonthCalendarComponent from './month-calendar';

export default MonthCalendarComponent.extend({
  classNames: ['month-calendar--selectable'],

  selectedDates: Ember.computed(function() {
    return [];
  }),

  actions: {
    clickedDate(date) {
      if (this.get('selectedDates').contains(date)) {
        this.get('selectedDates').removeObject(date);
      } else {
        this.get('selectedDates').pushObject(date);
      }
      this.sendAction('onDateClick', this.get('selectedDates'));
    }
  }
});
