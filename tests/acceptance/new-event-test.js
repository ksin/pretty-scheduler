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

test('successfully create event', function(assert) {
  visit('/events/new');

  fillIn('.new-event__name', "Harmonic Convergence");
  fillIn('.new-event__start-date', "07/01/2016");
  fillIn('.new-event__end-date', "07/10/2016");
  click('.new-event__create');

  andThen(() => {
    assert.equal(currentURL(), '/events/1');
    assert.equal(find('.event__name').text(), "Harmonic Convergence");
    assert.equal(find('.month-calendar__heading--selectable').text().trim(), "July 2016");
  });
});

test('invalid name', function(assert) {
  visit('/events/new');

  click('.new-event__create');

  andThen(() => {
    assert.equal(currentURL(), '/events/new');
    assert.equal(find('.new-event__message--error').text().trim(), "What's the event name tho?");
  });
});

test('invalid date range', function(assert) {
  visit('/events/new');

  fillIn('.new-event__name', "Splatfest");
  click('.new-event__create');

  andThen(() => {
    assert.equal(currentURL(), '/events/new');
    assert.equal(find('.new-event__message--error').text().trim(), "Please enter some dates!");
  });

  fillIn('.new-event__start-date', "07/10/2016");
  fillIn('.new-event__end-date', "07/01/2016");
  click('.new-event__create');

  andThen(() => {
    assert.equal(currentURL(), '/events/new');
    assert.equal(find('.new-event__message--error').text().trim(), "That date range is invalid. (Only 1-2 month range for now)");
  });
});

test('fill in all the fields', function(assert) {
  visit('/events/new');

  fillIn('.new-event__name', "NBA Finals 2016");
  fillIn('.new-event__location', "Oracle Arena");
  fillIn('.new-event__details', "Come watch LeBron make history");
  fillIn('.new-event__secret', "believe");
  fillIn('.new-event__start-date', "07/01/2016");
  fillIn('.new-event__end-date', "07/10/2016");

  andThen(() => {
    assert.equal(find('.new-event__message--filled').attr('src'), "/assets/images/wow.gif", "src of the image is correct");
    assert.equal(find('.new-event__message--filled').attr('alt'), "GIF of a dog with eyes widening and going 'Wow!'", "alt of the image is correct");
  });
});
