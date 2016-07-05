import Ember from 'ember';

export default Ember.Component.extend({
  tagName: "button",
  classNames: ['attendee-to-check'],
  classNameBindings: ["isBeingChecked:attendee-to-check--checking"],
  displayName: Ember.computed('attendee', function() {
    let attendee = this.get('attendee');
    if (attendee === "all") {
      return "All Attendees";
    } else if (attendee.get('constructor.modelName') === "attendee") {
      return attendee.get('name');
    }
  }),
  isBeingChecked: Ember.computed('checking,attendee', function() {
    return this.get('checking') === this.get('attendee');
  })
});
