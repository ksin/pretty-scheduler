import Ember from 'ember';

export default Ember.Component.extend({
  statusMessenger: Ember.inject.service(),
  classNames: ['form-message'],
  hello: Ember.computed.equal('statusMessenger.status', 'new-attendee:hello'),
  noName: Ember.computed.equal('statusMessenger.status', 'new-attendee:no-name'),
  wrongSecret: Ember.computed.equal('statusMessenger.status', 'new-attendee:wrong-secret'),
  success: Ember.computed.equal('statusMessenger.status', 'new-attendee:success')
});
