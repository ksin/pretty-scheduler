import moduleForIntegration from '../../helpers/module-for-integration';
import hbs from 'htmlbars-inline-precompile';
import { test } from 'ember-qunit';

moduleForIntegration('Integration | Component | line-input', {
  beforeEach() {
    this.render(hbs`
      {{line-input value="positive mental attitude"}}
    `);
  }
});

test('renders a line input with value', function(assert) {
  assert.equal(this.$('.line-input').length, 1);
  assert.equal(this.$('input').val(), "positive mental attitude");
});
