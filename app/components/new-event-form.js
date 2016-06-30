import Ember from 'ember';

export default Ember.Component.extend({
  isValidEvent: Ember.computed('event.{name,startDate,endDate},isValidDateRange', function() {
    return Ember.isPresent(this.get('event.name')) &&
            Ember.typeOf(this.get('event.startDate')) === 'date' &&
            Ember.typeOf(this.get('event.endDate')) === 'date' &&
            this.get('isValidDateRange');
  }),

  isValidDateRange: Ember.computed('event.{startDate,endDate}', function() {
    let startDate = this.get('event.startDate');
    let endDate = this.get('event.endDate');
    let maxDate = new Date(startDate.getFullYear(), startDate.getMonth() + 2, 0);
    return startDate <= endDate && endDate <= maxDate;
  }),

  actions: {
    selectStartDate(date) {
      this.set('event.startDate', date);
    },
    selectEndDate(date) {
      this.set('event.endDate', date);
    },

    createEvent() {
      if(this.get('isValidEvent')) {
        this.sendAction('createEvent', this.get('event'));
      }
    }
  }
});
