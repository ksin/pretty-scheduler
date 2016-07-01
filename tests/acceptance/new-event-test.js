import { test } from 'qunit';
import moduleForAcceptance from '../helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | new event');

test('visiting /events/new', function(assert) {
  visit('/events/new');

  andThen(() => {
    assert.equal(currentURL(), '/events/new');
    assert.equal(find('.new-event__header').length, 1, "Header is found");
  });
});

test('creating event - success', function(assert) {
  visit('/events/new');

  fillIn('.new-event__name', "Harmonic Convergence");
  fillIn('.new-event__start-date', "07/01/2016");
  fillIn('.new-event__end-date', "07/10/2016");
  click('.new-event__create');

  andThen(() => {
    assert.equal(currentURL(), '/events/1');
    assert.equal(find('.event__name').text(), "Harmonic Convergence");
    assert.equal(find('.month-calendar__heading').text(), "July 2016");
  });
});

test('creating event - invalid name', function(assert) {
  visit('/events/new');

  click('.new-event__create');

  andThen(() => {
    assert.equal(currentURL(), '/events/new');
  });
});

test('creating event - invalid date range', function(assert) {
  visit('/events/new');

  fillIn('.new-event__name', "Splatfest");
  click('.new-event__create');

  andThen(() => {
    assert.equal(currentURL(), '/events/new');
  });

  fillIn('.new-event__start-date', "07/10/2016");
  fillIn('.new-event__end-date', "07/01/2016");

  andThen(() => {
    assert.equal(currentURL(), '/events/new');
  });
});
