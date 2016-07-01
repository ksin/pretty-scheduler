import Ember from 'ember';

export default Ember.Mixin.create({
  actions: {
    error(error) {
      Ember.Logger.error(error);
      this.transitionTo('/not-found');
    }
  }
});
