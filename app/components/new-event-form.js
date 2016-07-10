/* globals moment */
import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ["new-event__form"],

  error: null,

  isValidEvent: Ember.computed('name,hasDates,isValidDateRange', function() {
    return Ember.isPresent(this.get('name')) &&
            this.get('hasDates') &&
            this.get('isValidDateRange');
  }),

  setValidationErrors() {
    if (Ember.isBlank(this.get('name'))) {
      this.set('error', "What's the event name tho?");
    } else if (!this.get('hasDates')) {
      this.set('error', "Please enter some dates!");
    } else if (!this.get('isValidDateRange')) {
      this.set('error', "That date range is invalid. (Only 1-2 month range for now)");
    } else {
      this.set('error', null);
    }
  },

  isValidDateRange: Ember.computed('startDate,endDate', function() {
    let startDate = this.get('startDate');
    let endDate = this.get('endDate');
    let maxDate = moment(new Date(startDate.year(), startDate.month() + 2, 0));
    return startDate <= endDate && endDate <= maxDate;
  }),

  hasDates: Ember.computed('startDate,endDate', function() {
    return moment.isMoment(this.get('startDate')) &&
            moment.isMoment(this.get('endDate'));
  }),

  // because we should reward people for filling in everything ;)
  allInputsFilled: Ember.computed('isValidEvent,error,location,details,secret', function() {
    return !this.get('error') &&
            this.get('isValidEvent') &&
            Ember.isPresent(this.get('location')) &&
            Ember.isPresent(this.get('details')) &&
            Ember.isPresent(this.get('secret'));
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
      this.set('startDate', moment(date));
    },
    selectEndDate(date) {
      this.set('endDate', moment(date));
    },

    createEvent() {
      if (this.get('isValidEvent')) {
        this.sendAction('createEvent', this.get('eventObject'));
      } else {
        this.setValidationErrors();
      }
    }
  }
});
