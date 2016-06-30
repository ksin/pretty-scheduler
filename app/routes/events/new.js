import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.createRecord('event');
  },

  actions: {
    createEvent(event) {
      event.save().then(() => {
        this.transitionTo('event', event);
      });
    }
  }
});
