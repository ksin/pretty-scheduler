import Ember from 'ember';
import MonthCalendarComponentMixin from '../mixins/month-calendar-component';

export default Ember.Component.extend(MonthCalendarComponentMixin, {
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
