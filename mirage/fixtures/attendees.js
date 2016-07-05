import defaultAttendees from './default-attendees';
import attendeesGenerator from './attendees-generator';

let Attendees = defaultAttendees;
/**
  Use the attendeesGenerator to test generating large numbers of attendees.

  To override the default, add a hash at the end of the url in the
  format of "#profile-attendees:NUMBER_OF_ATTENDEES",
  where NUMBER_OF_ATTENDEES is the amount of attendees you want to generate.

  Computations on availableDates will be the number of attendees
  raised by a factor of 10, since each attendee has 10 availableDates.
*/
(function() {
  let locationHash = window.location.hash;
  let r = /profile-attendees:(\d+)/;
  let match;

  if (match = locationHash.match(r)) {
    let numberOfAttendees = parseInt(match[1]);
    Attendees = attendeesGenerator(numberOfAttendees);
  }
})();

export default Attendees;

/**
  NOTE: These tests are outdated and generally ineffective. Just keeping it here for posterity.

  --- Tests done in Google Chrome in development environment ---

                                                    (Chrome Ember inspector)      (Chrome Ember inspector)
    Number of         |   Time spent calculating  |   View rendering time       |   View rendering time   |   Feels
    Attendees         |        dateFrequency      |   /events/:event_id         |   show availabilities   |   like

  Without includes in the events serializer (to sideload attendees):

  - 100 attendees     |   14ms                    |   406.27ms                  |   199.35ms              |   noticeably slower
  - 1000 attendees    |    -                      |       -                     |      -                  |   browser crashes

  With includes:

  - 100 attendees     |   14ms                     |  334.38ms                  |   214.01ms              |   unnoticeable
  - 1000 attendees    |   132ms                    |  436.58ms                  |   342.36ms              |   tiny delay
  - 10000 attendees   |   1256ms                   |  1356.02ms                 |   1516.29ms             |   very noticeable delay
  - 50000 attendees   |   6160ms                   |  5308.38ms                 |   7253.05ms             |   very slow, but no crash yet
  - 100000 attendees  |     -                      |     -                      |       -                 |   browser crashes
*/


