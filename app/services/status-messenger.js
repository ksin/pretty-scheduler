import Ember from 'ember';

/**
  This service is used mainly to communicate between routes
  and components. See new-attendee-form component for example.

  Statuses
  --------
  new-attendee:success
  new-attendee:no-name
  new-attendee:wrong-secret
  new-attendee:hello
*/

export default Ember.Service.extend({
  status: null,
  hasMessage: Ember.computed.bool('status'),
  clearStatus() {
    this.set('status', null);
  }
});

