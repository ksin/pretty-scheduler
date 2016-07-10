function generateAttendee(id) {
  return {
    id: id,
    name: `Attendee #${id}`,
    eventId: 23,
    availableDates: [
                      '2016-2-10',
                      '2016-2-11',
                      '2016-2-12',
                      '2016-2-13',
                      '2016-2-14',
                      '2016-2-15',
                      '2016-2-16',
                      '2016-2-17',
                      '2016-3-3',
                      '2016-3-8'
  ]};
}

export default function(numberOfAttendees) {
  let attendees = [];

  for(let i = 1; i <= numberOfAttendees; i++) {
    attendees.push(generateAttendee(i));
  }

  return attendees;
}
