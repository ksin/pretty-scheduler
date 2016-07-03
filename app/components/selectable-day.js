import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['month-calendar__day'],
  classNameBindings: ['selectable', 'selected:month-calendar__day--selected'],

  click() {
    if (this.get('selectable')) {
      this.sendAction('clickedDate', this.get('date'));
    }
  },

  isDateType: Ember.computed('date', function() {
    return Ember.typeOf(this.get('date')) === 'date';
  }),

  selectable: Ember.computed('startDate,endDate', function() {
    if (!this.get('isDateType')) {
      return 'month-calendar__day--non';
    } else if (this.get('startDate') <= this.get('date') && this.get('date') <= this.get('endDate')) {
      return 'month-calendar__day--selectable';
    }
    return 'month-calendar__day--unselectable';
  }),

  selected: Ember.computed('selectedDates.[],date', function() {
    return this.get('selectedDates').contains(this.get('date'));
  }),

  displayDate: Ember.computed('date,isDateType', function() {
    if (this.get('isDateType')) {
      return this.get('date').getDate();
    }
  })
});
