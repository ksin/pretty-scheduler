import Ember from 'ember';

export default Ember.Component.extend({
  tagName: "button",
  classNames: ['attendee-to-check'],
  classNameBindings: ["isBeingChecked", "checkType"],

  displayName: Ember.computed('attendee.name', function() {
    return this.get('attendee.name');
  }),

  isBeingChecked: Ember.computed('attendee.isAll,checking', function() {
    if (this.get('checking') === this.get('attendee')) {
      let className = "attendee-to-check--checking";
      if (this.get('attendee.isAll')) {
        className += " attendee-to-check__all--checking";
      } else {
        className += " attendee-to-check__attendees--checking";
      }
      return className;
    }
  }),

  checkType: Ember.computed('attendee.isAll', function() {
    if (this.get('attendee.isAll')) {
      return "attendee-to-check__all";
    } else {
      return "attendee-to-check__attendees";
    }
  })
});
