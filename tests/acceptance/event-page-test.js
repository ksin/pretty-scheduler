import { test } from 'qunit';
import moduleForAcceptance from '../helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | event page', {
  beforeEach() {
    server.create('event', {
      name: "Day of the Black Sun",
      startDate: new Date(2016, 1, 10),
      endDate: new Date(2016, 2, 25)});
  }
});

test('visiting /events/:id', function(assert) {
  visit('/events/1');

  andThen(() => {
    assert.equal(currentURL(), '/events/1');
    assert.equal(find('.event__name').text().trim(), "Day of the Black Sun");
    assert.equal(find('.new-attendee__message').length, 1, "New attendee message is found");
    assert.equal(find('.selectable-month__heading:contains(February 2016)').length, 1, "February selectable calendar is found");
    assert.equal(find('.selectable-month__heading:contains(March 2016)').length, 1, "March selectable calendar is found");
  });

  click('.event-calendars__view-availabilities');

  andThen(() => {
    assert.equal(find('.new-attendee__message').length, 0, "New attendee message is not found");
    assert.equal(find('.aggregate-month__heading:contains(February 2016)').length, 1, "February aggregate calendar is found");
    assert.equal(find('.aggregate-month__heading:contains(March 2016)').length, 1, "March aggregate calendar is found");
  });

  click('.event-calendars__share-dates');

  andThen(() => {
    assert.equal(find('.new-attendee__message').length, 1, "New attendee message is found");
    assert.equal(find('.selectable-month__heading:contains(February 2016)').length, 1, "February selectable calendar is found");
    assert.equal(find('.selectable-month__heading:contains(March 2016)').length, 1, "March selectable calendar is found");
    assert.equal(find('.event-calendars__view-availabilities').length, 1, "View availabilities button is found");
  });
});
