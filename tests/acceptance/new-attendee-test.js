import { test } from 'qunit';
import moduleForAcceptance from '../helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | new attendee', {
  beforeEach() {
    server.create('event', {
      name: "Day of the Black Sun",
      secret: "roku",
      startDate: new Date(2016, 1, 10),
      endDate: new Date(2016, 2, 31)}
    );
  }
});

test('visiting /events/:id', function(assert) {
  visit('/events/1');

  andThen(() => {
    assert.equal(currentURL(), '/events/1');
    assert.equal(find('.event__name').text().trim(), "Day of the Black Sun");
    assert.equal(find('.new-attendee__header').length, 1, "New attendee header is found");
    assert.equal(find('.month-calendar__heading--selectable:contains(February 2016)').length, 1, "February selectable calendar is found");
    assert.equal(find('.month-calendar__heading--selectable:contains(March 2016)').length, 1, "March selectable calendar is found");
  });
});

test('successfully create attendee with availabilities', function(assert) {
  visit('/events/1');

  click('.month-calendar__day--selectable:contains(29)'); // February 29
  click('.month-calendar__day--selectable:contains(31)'); // March 31
  fillIn('.form-row__input-name', "Steven Universe");
  fillIn('.form-row__input-secret', "roku");
  click('.form-row__button');

  andThen(() => {
    assert.equal(server.db.attendees[0].name, "Steven Universe", "Attendee name is saved to server");
    assert.deepEqual(server.db.attendees[0].availableDates, [
      (new Date(2016, 1, 29)).toJSON(), (new Date(2016, 2, 31)).toJSON()
    ], "Available dates are saved to server");
    assert.equal(find('.form-message__text').text().trim(), "BOO-YAH! Your dates are saved.");
    assert.equal(find('.form-message__img').attr('src'), "/assets/images/success.gif");
    assert.equal(find('.form-message__img').attr('alt'), "GIF of two small round dogs giving each other a paw high five");
  });
});

test('says hi when name is entered', function(assert) {
  visit('/events/1');

  fillIn('.form-row__input-name', "Himawari");
  triggerEvent('.form-row__input-name', 'blur');

  andThen(() => {
    assert.equal(find('.form-message__text').text().trim(), "Hi there, Himawari!");
    assert.equal(find('.form-message__img').attr('src'), "/assets/images/hello.gif");
    assert.equal(find('.form-message__img').attr('alt'), "GIF of a dog jumping up and waving HI");
  });
});

test('missing name', function(assert) {
  visit('/events/1');

  click('.form-row__button');

  andThen(() => {
    assert.equal(find('.form-message__text').text().trim(), "What's your name tho?");
    assert.equal(find('.form-message__img').attr('src'), "/assets/images/no-name.gif");
    assert.equal(find('.form-message__img').attr('alt'), "GIF of a dog with fire in its eyes");
  });
});

test('invalid password', function(assert) {
  visit('/events/1');

  fillIn('.form-row__input-name', "Aomine");
  click('.form-row__button');

  andThen(() => {
    assert.equal(find('.form-message__text').text().trim(), "You got the secret wrong!");
    assert.equal(find('.form-message__img').attr('src'), "/assets/images/wrong-secret.gif");
    assert.equal(find('.form-message__img').attr('alt'), "GIF of a dog barking");
  });
});
