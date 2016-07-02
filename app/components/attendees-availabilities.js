import Ember from 'ember';

export default Ember.Component.extend({
  /**
    Ideally, we can expire the cached value when a user
    interaction leads to an insertion/deletion to an attendees'
    availableDates. However, 'event.attendees@each.availableDates.[]'
    is an invalid dependent key. It is a little soon to over optimize,
    so this note is a reminder for us to address this later.
  */
  dateFrequency: Ember.computed('event.attendees.@each.availableDates', function() {
    let dateFrequency = {};
    dateFrequency["max"] = 1;
    this.get('event.attendees').forEach((attendee) => {
      attendee.get('availableDates').forEach((dateOrString) => {
        let date = new Date(dateOrString); // ensures coercion to date type
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
