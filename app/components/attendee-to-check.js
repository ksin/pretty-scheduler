import Ember from 'ember';

export default Ember.Component.extend({
  tagName: "button",
  classNames: ['attendee-to-check'],
  classNameBindings: ["isBeingChecked", "checkType"],

  isAll: Ember.computed.equal('attendee', "all"),
  isAttendee: Ember.computed.equal('attendee.constructor.modelName', "attendee"),

  displayName: Ember.computed('attendee.name,isAttendee,isAll', function() {
    let attendee = this.get('attendee');
    if (this.get('isAll')) {
      return "All Attendees";
    } else if (this.get('isAttendee')) {
      return attendee.get('name');
    }
  }),

  isBeingChecked: Ember.computed('checking,attendee,isAll,isAttendee', function() {
    if (this.get('checking') === this.get('attendee')) {
      let className = "attendee-to-check--checking";
      if (this.get('isAll')) {
        className += " attendee-to-check__all--checking";
      } else if (this.get('isAttendee')) {
        className += " attendee-to-check__attendees--checking";
      }
      return className;
    }
  }),

  checkType: Ember.computed('isAll,isAttendee', function() {
    if (this.get('isAll')) {
      return "attendee-to-check__all";
    } else if (this.get('isAttendee')) {
      return "attendee-to-check__attendees";
    }
  })
});
