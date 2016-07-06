import Ember from 'ember';
import NotFoundMixin from '../../mixins/not-found';

export default Ember.Route.extend(NotFoundMixin, {
  redirect() {
    this.sendAction("error", "There is no events page.");
  }
});
