import Ember from 'ember';
import CalendarDayComponent from './calendar-day';
import containsDate from '../utils/contains-date';

export default CalendarDayComponent.extend({
  classNameBindings: ['available:month-calendar__day--available'],

  available: Ember.computed('availableMoments.[],isDateType,date', function() {
    if (!this.get('isDateType')) { return; }
    return containsDate(this.get('availableMoments'), this.get('date'));
  })
});
