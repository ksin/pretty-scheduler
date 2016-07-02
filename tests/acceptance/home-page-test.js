import { test } from 'qunit';
import moduleForAcceptance from '../helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | home page');

test('visiting /', function(assert) {
  visit('/');

  andThen(() => {
    assert.equal(currentURL(), '/');
    assert.equal(find('.home__heading').text(), "Pretty Scheduler");
    assert.equal(find('.home__new-event').text(), "Create an Event!");
  });
});

test('new event', function(assert) {
  visit('/');

  click('.home__new-event');

  andThen(() => {
    assert.equal(currentURL(), '/events/new');
  });
});
