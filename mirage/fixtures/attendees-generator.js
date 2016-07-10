/* globals moment */

function generateAttendee(id) {
  return {
    id: id,
    name: `Attendee #${id}`,
    eventId: 23,
    availableDates: [
                      moment('2016-2-10'),
                      moment('2016-2-11'),
                      moment('2016-2-12'),
                      moment('2016-2-13'),
                      moment('2016-2-14'),
                      moment('2016-2-15'),
                      moment('2016-2-16'),
                      moment('2016-2-17'),
                      moment('2016-3-3'),
                      moment('2016-3-8')
  ]};
}

export default function(numberOfAttendees) {
  let attendees = [];

  for(let i = 1; i <= numberOfAttendees; i++) {
    attendees.push(generateAttendee(i));
  }

  return attendees;
}
