import { test } from 'qunit';
import moduleForAcceptance from '../helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | new attendee', {
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
    assert.equal(find('.new-attendee__header').length, 1, "New attendee header is found");
    assert.equal(find('.month-calendar__heading--selectable:contains(February 2016)').length, 1, "February selectable calendar is found");
    assert.equal(find('.month-calendar__heading--selectable:contains(March 2016)').length, 1, "March selectable calendar is found");
  });
});
