import Ember from 'ember';

export default Ember.Component.extend({
  showAbout: false,

  icon: Ember.computed('showAbout', function() {
    return this.get('showAbout') ? "×" : "?";
  }),

  iconClass: Ember.computed('showAbout', function() {
    if (this.get('showAbout')) {
      return 'about__icon about__icon--close';
    }
    return 'about__icon about__icon--open';
  }),

  actions: {
    toggleAbout() {
      this.toggleProperty('showAbout');
    }
  }
});
