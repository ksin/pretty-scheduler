import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['form-message'],
  hello: Ember.computed.equal('message', 'hello'),
  noName: Ember.computed.equal('message', 'no-name'),
  wrongSecret: Ember.computed.equal('message', 'wrong-secret')
});
