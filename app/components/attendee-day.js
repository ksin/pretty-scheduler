import Ember from 'ember';
import CalendaryDayComponent from './calendar-day';

export default CalendaryDayComponent.extend({
  classNameBindings: ['available:month-calendar__day--available'],

  available: Ember.computed('availableTimes.[],date', function() {
    if (Ember.typeOf(this.get('date')) !== 'date') { return; }
    return this.get('availableTimes').contains(this.get('date').getTime());
  })
});
