function date(year, month, day) {
  return new Date(year, month, day);
}

function generateAttendee(id) {
  return {
    id: id,
    name: `Attendee #${id}`,
    eventId: 23,
    availableDates: [
                      date(2016, 1, 10),
                      date(2016, 1, 11),
                      date(2016, 1, 12),
                      date(2016, 1, 13),
                      date(2016, 1, 14),
                      date(2016, 1, 15),
                      date(2016, 1, 16),
                      date(2016, 1, 17),
                      date(2016, 2, 3),
                      date(2016, 2, 8)
  ]};
}

export default function(numberOfAttendees) {
  let attendees = [];

  for(let i = 1; i <= numberOfAttendees; i++) {
    attendees.push(generateAttendee(i));
  }

  return attendees;
};
