import Ember from 'ember';

export default Ember.Component.extend({
  didInsertElement() {
    this.computeDateFrequency();
  },

  /**
    It is quite costly to put this method here.
    Ideally, we cache it for the first rendering
    and then, only expire the cache if a user interaction
    causes an insertion/deletion to an attendees' availableDates.
    We can't simply make a 'dateFrequency' computedProperty because
    'event.attendees@each.availableDates.[]' is an invalid
    dependent key. However, it is still too soon to over optimize,
    so we will leave this here to be addressed later.
  */
  computeDateFrequency() {
    let dateFrequency = {};
    dateFrequency["max"] = 1;
    this.get('event.attendees').then(function(attendees) {
      attendees.forEach(function(attendee) {
        attendee.get('availableDates').forEach(function(dateOrString) {
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
      this.set('dateFrequency', dateFrequency);
    });
  }
});
