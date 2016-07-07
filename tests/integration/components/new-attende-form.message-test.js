import moduleForIntegration from '../../helpers/module-for-integration';
import hbs from 'htmlbars-inline-precompile';
import { test } from 'ember-qunit';

moduleForIntegration('Integration | Component | new-attendee-form-message', {
  beforeEach() {
    this.render(hbs`
      {{new-attendee-form-message}}
    `);
  }
});

test('renders new attendee form message', function(assert) {
  assert.equal(this.$('.form-message').length, 1);
});
