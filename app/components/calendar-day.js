import Ember from 'ember';

export default Ember.Component.extend({
  layoutName: "components/calendar-day",

  classNames: ['month-calendar__day'],

  isDateType: Ember.computed('date', function() {
    return Ember.typeOf(this.get('date')) === 'date';
  }),

  displayDate: Ember.computed('date,isDateType', function() {
    if (this.get('isDateType')) {
      return this.get('date').getDate();
    }
  })
});
