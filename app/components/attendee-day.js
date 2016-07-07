import Ember from 'ember';
import CalendarDayComponent from './calendar-day';

export default CalendarDayComponent.extend({
  classNameBindings: ['available:month-calendar__day--available'],

  available: Ember.computed('availableTimes.[],date', function() {
    if (Ember.typeOf(this.get('date')) !== 'date') { return; }
    return this.get('availableTimes').contains(this.get('date').getTime());
  })
});
