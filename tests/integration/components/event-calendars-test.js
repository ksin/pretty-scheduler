import moduleForIntegration from '../../helpers/module-for-integration';
import hbs from 'htmlbars-inline-precompile';
import { test } from 'ember-qunit';

moduleForIntegration('Integration | Component | event-calendars', {
  beforeEach() {
    this.render(hbs`
      {{event-calendars}}
    `);
  }
});

test('renders an event calendar', function(assert) {
  assert.equal(this.$('.event-calendars').length, 1);
});


