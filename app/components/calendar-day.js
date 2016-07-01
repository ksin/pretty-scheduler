import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['calendar-day'],
  classNameBindings: ['selectable:selectable:unselectable', 'selected'],

  click() {
    if (this.get('selectable')) {
      this.sendAction('clickedDate', this.get('date'));
    }
  },

  selectable: Ember.computed('startDate,endDate', function() {
    return this.get('startDate') <= this.get('date') && this.get('date') <= this.get('endDate');
  }),

  selected: Ember.computed('selectedDates.[],date', function() {
    return this.get('selectedDates').contains(this.get('date'));
  }),

  displayDate: Ember.computed('date', function() {
    let date = this.get('date');
    if (Ember.typeOf(date) === 'date') {
      return this.get('date').getDate();
    }
  }),
});
