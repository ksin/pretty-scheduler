import Ember from 'ember';
import MonthCalendarComponent from './month-calendar';

export default MonthCalendarComponent.extend({
  /**
    We have to convert to a date object first because date
    is a string when it comes from the server. Then, we have to
    map to the date's time because in attendee-day,
    we are checking via .contains, which uses the equals operator
    to compare. However, dates can't be compared with the equals
    operator directly. Thus, we convert each date with .getTime()
  */
  availableTimes: Ember.computed('availableDates', function() {
    return this.get('availableDates').map(function(date) {
      return new Date(date).getTime();
    });
  })
});
