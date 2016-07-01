import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.createRecord('event');
  },

  actions: {
    createEvent(model) {
      model.save().then((event) => {
        this.transitionTo('event', event.id);
      });
    }
  }
});
