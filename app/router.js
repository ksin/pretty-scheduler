import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('events', function() {
    this.route('new');
  });
  this.route('event', { path: '/events/:event_id' });
  this.route('not-found', { path: '/*path' });

  this.route('test', function() {
    this.route('event', { path: '/events/:event_id' });
  });
});

export default Router;
