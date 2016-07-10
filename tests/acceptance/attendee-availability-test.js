import { test } from 'qunit';
import moduleForAcceptance from '../helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | attendee availability', {
  beforeEach() {
    server.create('event', {
      name: "Chuunin Exam",
      startDate: '2016-2-10',
      endDate: '2016-3-31'}
    );
    server.create('attendee', {
      name: "Ino",
      eventId: 1,
      availableDates: [
        '2016-2-10',
        '2016-2-11',
        '2016-2-12'
    ]});
    server.create('attendee', {
      name: "Shika",
      eventId: 1,
      availableDates: [
        '2016-2-10',
        '2016-2-11'
    ]});
    server.create('attendee', {
      name: "Cho",
      eventId: 1,
      availableDates: [
        '2016-2-10'
    ]});
  }
});

test("cannot view availabilities if no attendees exist for event", function(assert) {
  server.create('event', {
    name: "Finding Dory",
    startDate: '2016-2-10',
    endDate: '2016-3-31'}
  );

  visit('/events/2');

  andThen(() => {
    assert.equal(find('.event-calendars__toggle').length, 0, "Event calendars toggle is not found");
  });
});

test("can view availabilities and revisit new attendee form", function(assert) {
  visit('/events/1');

  andThen(() => {
    assert.equal(find('.event-calendars__toggle').text().trim(), "Check out the dates that attendees are available yo!");
  });

  click('.event-calendars__toggle');

  andThen(() => {
    assert.equal(find('.event-calendars__toggle').text().trim(), "Hey share the dates that you're available ok?");
  });

  click('.event-calendars__toggle');

  andThen(() => {
    assert.equal(find('.new-attendee__header').length, 1, "New attendee header is found");
    assert.equal(find('.month-calendar__heading--selectable:contains(February 2016)').length, 1, "February selectable calendar is found");
    assert.equal(find('.month-calendar__heading--selectable:contains(March 2016)').length, 1, "March selectable calendar is found");
  });
});

test("renders aggregate attendee availabilities", function(assert) {
  visit('/events/1');

  click('.event-calendars__toggle');

  andThen(() => {
    assert.equal(find('.attendees-availabilities__header').text().trim(), "Check out the dates that attendees are available yo!");
    assert.equal(find('.month-calendar__heading--aggregate:contains(February 2016)').length, 1, "February aggregate calendar is found");
    assert.equal(find('.month-calendar__heading--aggregate:contains(March 2016)').length, 1, "March aggregate calendar is found");
    assert.equal(find('.attendees-availabilities__legend').length, 1, "Calendar legend is found");
    assert.equal(find('.legend').length, 3, "Three keys found in legend");
    assert.equal(find('.month-calendar__day--everyone:contains(10)').length, 1, "Shows that everyone is available on February 10");
    assert.equal(find('.month-calendar__day--more:contains(11)').length, 1, "Shows that more are available on February 11");
    assert.equal(find('.month-calendar__day--few:contains(12)').length, 1, "Shows that few are available on February 12");
  });
});

test("renders availability for individual attendee", function(assert) {
  visit('/events/1');

  click('.event-calendars__toggle');

  andThen(() => {
    assert.equal(find('.attendee-to-check__attendees').length, 3, "Three attendees listed");
  });

  click('.attendee-to-check__attendees:contains(Cho)');

  andThen(() => {
    assert.equal(find('.attendee-to-check__attendees--checking:contains(Cho)').length, 1, "Cho is marked as selected");
    assert.equal(find('.month-calendar__heading--attendee:contains(February 2016)').length, 1, "February attendee calendar is found");
    assert.equal(find('.month-calendar__heading--attendee:contains(March 2016)').length, 1, "March attendee calendar is found");
    assert.equal(find('.month-calendar__day--available:contains(10)').length, 1, "Availability for February 10 is shown");
  });
});

test("can re-render aggregate after rendering an individual attendee", function(assert) {
  visit('/events/1');

  click('.event-calendars__toggle');
  click('.attendee-to-check__attendees:contains(Cho)');
  click('.attendee-to-check__all');

  andThen(() => {
    assert.equal(find('.attendee-to-check__all--checking').length, 1, "All Attendees is marked as selected");
    assert.equal(find('.month-calendar__heading--aggregate:contains(February 2016)').length, 1, "February aggregate calendar is found");
    assert.equal(find('.month-calendar__heading--aggregate:contains(March 2016)').length, 1, "March aggregate calendar is found");
    assert.equal(find('.attendees-availabilities__legend').length, 1, "Calendar legend is found");
    assert.equal(find('.legend').length, 3, "Three keys found in legend");
  });
});
