import { test } from 'qunit';
import moduleForAcceptance from '../helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | not found');

test('visiting /not-found', function(assert) {
  visit('/not-found');

  andThen(() =>{
    assert.equal(currentURL(), '/not-found');
    assert.equal(find('.not-found__heading').text(), "404 Not Found");
    assert.equal(find('.not-found__message').text().trim(), "there's nothing to see here");
  });
});

test('visiting url not defined in router', function(assert) {
  visit('/blarg31209sadpo');

  andThen(() =>{
    assert.equal(currentURL(), '/not-found');
  });
});

test('visiting route with error when looking up resource', function(assert) {
  server.get('/events/11', {message: 'not found'}, 404);

  visit('/events/11');

  andThen(() =>{
    assert.equal(currentURL(), '/not-found');
  });
});

