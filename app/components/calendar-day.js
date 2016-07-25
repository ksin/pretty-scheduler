/* globals moment */
import Ember from 'ember';

export default Ember.Component.extend({
  layoutName: "components/calendar-day",
  tagName: "div",

  classNames: ['month-calendar__day'],
  classNameBindings: ['isDateType::month-calendar__day--non', 'inRange:month-calendar__day--in-range:month-calendar__day--out-range'],

  isDateType: Ember.computed('date', function() {
    return moment.isMoment(this.get('date'));
  }),

  inRange: Ember.computed('startDate,endDate,isDateType,date', function() {
    return this.get('isDateType') &&
            this.get('date').isSameOrAfter(this.get('startDate')) &&
            this.get('date').isSameOrBefore(this.get('endDate'));
  }),

  displayDate: Ember.computed('date,isDateType', function() {
    if (this.get('isDateType')) {
      return this.get('date').date();
    }
  })
});
