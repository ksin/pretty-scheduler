import Ember from 'ember';

export default Ember.Component.extend({
  isValidEvent: Ember.computed('name,startDate,endDate,isValidDateRange', function() {
    return Ember.isPresent(this.get('name')) &&
            Ember.typeOf(this.get('startDate')) === 'date' &&
            Ember.typeOf(this.get('endDate')) === 'date' &&
            this.get('isValidDateRange');
  }),

  isValidDateRange: Ember.computed('startDate,endDate', function() {
    let startDate = this.get('startDate');
    let endDate = this.get('endDate');
    let maxDate = new Date(startDate.getFullYear(), startDate.getMonth() + 2, 0);
    return startDate <= endDate && endDate <= maxDate;
  }),

  eventObject: Ember.computed('name,location,details,secret,startDate,endDate', function() {
    return {
      name: this.get('name'),
      location: this.get('location'),
      details: this.get('details'),
      secret: this.get('secret'),
      startDate: this.get('startDate'),
      endDate: this.get('endDate')
    };
  }),

  actions: {
    selectStartDate(date) {
      this.set('startDate', date);
    },
    selectEndDate(date) {
      this.set('endDate', date);
    },

    createEvent() {
      if (this.get('isValidEvent')) {
        this.sendAction('createEvent', this.get('eventObject'));
      } else {
        console.log('Event is invalid. Implement a validation error.');
      }
    }
  }
});
