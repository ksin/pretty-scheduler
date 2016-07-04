import Ember from 'ember';

export default Ember.Component.extend({
  tagName: "button",
  classNameBindings: ["isBeingChecked:attendees-availabilities__check--checking"],
  displayName: Ember.computed('attendee', function() {
    let attendee = this.get('attendee');
    if (attendee === "all") {
      return "All";
    } else if (attendee.get('constructor.modelName') === "attendee") {
      return attendee.get('name');
    }
  }),
  isBeingChecked: Ember.computed('checking,attendee', function() {
    return this.get('checking') === this.get('attendee');
  })
});
