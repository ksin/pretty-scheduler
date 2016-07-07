import { test } from 'qunit';
import moduleForAcceptance from '../helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | home page');

test('visiting /', function(assert) {
  visit('/');

  andThen(() => {
    assert.equal(currentURL(), '/');
    assert.equal(find('.home__heading').length, 1, "Home header found");
    assert.equal(find('.home__new-event').length, 1, "Plan new event found");
  });
});

test('new event', function(assert) {
  visit('/');

  click('.home__button');

  andThen(() => {
    assert.equal(currentURL(), '/events/new');
  });
});
