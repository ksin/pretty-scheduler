import moduleForIntegration from '../../helpers/module-for-integration';
import hbs from 'htmlbars-inline-precompile';
import { test } from 'ember-qunit';

moduleForIntegration('Integration | Component | about-page', {
  beforeEach() {
    this.render(hbs`
      {{about-page}}
    `);
  }
});

test('can toggle showing about page', function(assert) {
  assert.equal(this.$('.about__modal-box').length, 0, "About modal box hidden");

  this.$('.about__icon--open').click();

  assert.equal(this.$('.about__modal-box').length, 1, "About modal box is shown");

  this.$('.about__icon--close').click();

  assert.equal(this.$('.about__modal-box').length, 0, "About modal box hidden after clicking close");
});
