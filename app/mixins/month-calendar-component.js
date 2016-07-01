import Ember from 'ember';

const MonthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export default Ember.Mixin.create({
  monthName: Ember.computed('month', function() {
    return MonthNames[this.get('month')];
  }),

  year: Ember.computed('month,startDate,endDate', function() {
    let month = this.get('month');
    let startDate = this.get('startDate');
    let endDate = this.get('endDate');
    if (month < startDate.getMonth()) {
      return endDate.getFullYear();
    }
    return startDate.getFullYear();
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
    let date = new Date(year, month, 1);
    let days = [];
    days.push(this.preFirstDay(date.getDay()));

    while (date.getMonth() === month) {
      days[days.length-1].push(new Date(date));

      if (date.getDay() === 6) {
        date.setDate(date.getDate() + 1);
        if (date.getDate() !== 1) {
          days.push([]);
        }
      } else {
        date.setDate(date.getDate() + 1);
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
