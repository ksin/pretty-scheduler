import moduleForIntegration from '../../helpers/module-for-integration';
import hbs from 'htmlbars-inline-precompile';
import { test } from 'ember-qunit';

moduleForIntegration('Integration | Component | new-attendee-form', {
  beforeEach() {
    this.render(hbs`
      {{new-attendee-form}}
    `);
  }
});

test('renders new attendee form', function(assert) {
  assert.equal(this.$('.new-attendee').length, 1);
});
