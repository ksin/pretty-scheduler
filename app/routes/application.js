import Ember from 'ember';

export default Ember.Route.reopen({
  activate: function() {
    this._super();
    Ember.$('body').attr('class', this.routeName.replace(/\./g, '-').dasherize());
  }
});
