export default function(server) {

  let event = server.create('event', {
    id: 23,
    name: 'Spring Splatfest Magic Funtime',
    location: "Walt Disney World, Orlando, FL 32830",
    details: "EAT FOOD. SUNSHINE. AWESOME.",
    secret: "squid",
    startDate: "2016-02-09",
    endDate: "2016-03-20"
  });

  /*
    Generate large numbers of attendees by adding a hash at the end of the url
    in the format of "#profile-attendees:NUMBER_OF_ATTENDEES".
  */
  let locationHash = window.location.hash;
  let r = /profile-attendees:(\d+)/;
  let match = locationHash.match(r);

  if (match) {
    let numberOfAttendees = parseInt(match[1]);
    server.createList('attendee', numberOfAttendees, {
      eventId: event.id,
      availableDates: ['2016-02-10']
    });

  } else {
    // defaults 9 attendees that belong to event 23
    server.loadFixtures('attendees');

  }

}
