import moduleForIntegration from '../../helpers/module-for-integration';
import hbs from 'htmlbars-inline-precompile';
import { test } from 'ember-qunit';

moduleForIntegration('Integration | Component | new-event-form', {
  beforeEach() {
    this.render(hbs`
      {{new-event-form}}
    `);
  }
});

test('renders new event form', function(assert) {
  assert.equal(this.$('.new-event__form').length, 1);
});
