import Attendees from './default-attendees';

/**
  Use the attendeesGenerator below and comment out the Attendees import above
  to test generating large numbers of attendees.

  Computations on availableDates will be the number of attendees
  raised by a factor of 10, since each attendee has 10 availableDates.

  *** Tests done in Google Chrome on a 2012 MacBook Air ***

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
  - 100000 attendees  |     -                      |     -                      |   browser crashes
*/
// import attendeesGenerator from './attendees-generator';
// let Attendees = attendeesGenerator(100);

export default Attendees;
