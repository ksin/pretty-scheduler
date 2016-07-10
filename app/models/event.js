/* globals moment */
import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { hasMany } from 'ember-data/relationships';

export default Model.extend({
  name: attr('string'),
  details: attr('string'),
  location: attr('string'),
  secret: attr('string'), // temp | authentication should be done on server, obviously.
  startDate: attr('utc'),
  endDate: attr('utc'),
  attendees: hasMany('attendee'),

  /**
    Counts the months from startDate to endDate

    @return {Array} of months as integers (0-11)
  */
  months: Ember.computed('startDate,endDate', function() {
    let months = [];
    let startMonth = this.get('startDate').month();
    let endMonth = this.get('endDate').month();

    if (endMonth < startMonth) {
      for(let a = startMonth; a < 12; a++) {
        months.push(a);
      }
      for(let b = 0; b <= endMonth; b++) {
        months.push(b);
      }
      return months;
    }

    for(let c = startMonth; c <= endMonth ; c++) {
      months.push(c);
    }
    return months;
  }),

  /**
    Ideally, we can expire the cached value when a user
    interaction leads to an insertion/deletion to an attendees'
    availableDates. However, 'attendees@each.availableDates.[]'
    is an invalid dependent key. It is a little soon to over optimize,
    so this note is a reminder for us to address this later.
  */
  dateFrequency: Ember.computed('attendees.@each.availableDates', function() {
    let dateFrequency = {};
    dateFrequency["max"] = 1;
    this.get('attendees').forEach((attendee) => {
      attendee.get('availableDates').forEach((dateOrString) => {
        let date = moment.utc(dateOrString); // ensures coercion to moment date
        if (dateFrequency[date]) {
          dateFrequency[date] = dateFrequency[date] + 1;
          if (dateFrequency[date] > dateFrequency["max"]) {
            dateFrequency["max"] = dateFrequency[date];
          }
        } else {
          dateFrequency[date] = 1;
        }
      });
    });
    return dateFrequency;
  })
});
