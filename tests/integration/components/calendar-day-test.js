import moduleForIntegration from '../../helpers/module-for-integration';
import hbs from 'htmlbars-inline-precompile';
import { test } from 'ember-qunit';

moduleForIntegration('Integration | Component | calendar-day', {
  beforeEach() {
    this.set('date', new Date(2016, 1, 10));
    this.render(hbs`
      {{calendar-day date=date}}
    `);
  }
});

test('renders a calendar day', function(assert) {
  assert.equal(this.$('.month-calendar__day').text().trim(), "10");
});
