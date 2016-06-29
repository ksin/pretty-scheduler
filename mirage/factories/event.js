import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  name(i) { return `Event ${i+1}`; },
  details() { return faker.lorem.sentence(); },
  location() { return faker.address.streetAddress(); },
  secret() { return faker.internet.password(); },
  startDate() { return faker.date.recent(); },
  endDate() { return faker.date.future(); }
});
