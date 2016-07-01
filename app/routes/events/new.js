import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    createEvent(eventObject) {
      let model = this.store.createRecord('event', eventObject);
      model.save().then((event) => {
        this.transitionTo('event', event.id);
      });
    }
  }
});
