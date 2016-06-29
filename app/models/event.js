import Model from 'ember-data/model';
import attr from 'ember-data/attr';

export default Model.extend({
  name: attr(),
  details: attr(),
  location: attr(),
  secret: attr(),
  startDate: attr(),
  endDate: attr()
});
