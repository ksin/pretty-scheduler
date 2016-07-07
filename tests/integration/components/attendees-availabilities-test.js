import moduleForIntegration from '../../helpers/module-for-integration';
import hbs from 'htmlbars-inline-precompile';
import { test } from 'ember-qunit';

moduleForIntegration('Integration | Component | attendees-availabilities', {
  beforeEach() {
    this.render(hbs`
      {{attendees-availabilities}}
    `);
  }
});

test('renders attendees-availabilities', function(assert) {
  assert.equal(this.$('.attendees-availabilities').length, 1);
});
