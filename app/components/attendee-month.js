/* globals moment */
import Ember from 'ember';
import MonthCalendarComponent from './month-calendar';

export default MonthCalendarComponent.extend({
  /**
    We have to convert to a moment object first in order to compare
    using moment.isSame() in the attendee-day component.
  */
  availableMoments: Ember.computed('availableDates', function() {
    return this.get('availableDates').map(function(date) {
      return moment(date);
    });
  })
});
