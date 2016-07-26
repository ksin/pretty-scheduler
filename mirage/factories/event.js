/* globals moment */
import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  name() { return faker.random.words(); },
  details() { return faker.lorem.sentence(); },
  location() { return faker.address.streetAddress(); },
  secret() { return faker.internet.password(); },
  startDate() { return moment.utc(faker.date.future()).toISOString(); },

  /**
    endDate is constrained to startDate + (up to 30 days)
    so only 2 months are shown at most
  */
  endDate() {
    let date = this.startDate;
    let rand30 = Math.random() * (30 - 1) + 1;
    date.add(rand30, 'day');
    return moment.utc(date).toISOString();
  }
});
