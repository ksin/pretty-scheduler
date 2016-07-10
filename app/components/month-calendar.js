/* globals moment */
import Ember from 'ember';

const MonthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export default Ember.Component.extend({
  classNames: ["month-calendar"],

  monthName: Ember.computed('month', function() {
    return MonthNames[this.get('month')];
  }),

  year: Ember.computed('month,startDate,endDate', function() {
    let month = this.get('month');
    let startDate = this.get('startDate');
    let endDate = this.get('endDate');
    if (month < startDate.month()) {
      return endDate.year();
    }
    return startDate.year();
  }),

  /**
    Each array represents a week from sun-sat.
    If the month doesn't start on a sunday, we fill
    the first array with 'N/A' up till the first day
    of the month with this.preFirstDay

    @return {Array} nested array of the days of the month
  */
  daysInMonth: Ember.computed('month,year', function() {
    let month = this.get('month');
    let year = parseInt(this.get('year'));
    let date = moment(`${year}-${month+1}-1`);
    let days = [];
    days.push(this.preFirstDay(date.day()));

    while (date.month() === month) {
      days[days.length-1].push(moment(date));

      if (date.day() === 6) {
        date.add('days', 1);
        if (date.day() !== 1) {
          days.push([]);
        }
      } else {
        date.add('day', 1);
      }
    }
    return days;
  }),

  /**
    @param {Number} day of the week from 0-6
    @return {Array} empty or filled with 'N/A'
  */
  preFirstDay(day) {
    let firstWeek = [];
    for (let i = 0; i < day; i++) {
      firstWeek.push('N/A');
    }
    return firstWeek;
  },
});
