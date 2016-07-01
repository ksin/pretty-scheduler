import Ember from 'ember';
import { moduleForComponent } from 'ember-qunit';

export default function (name, options={}) {
  moduleForComponent(name, name, {
    integration: true,
    setup() {
      this.select = function (from, text) {
        let $el = this.$(from);
        let $option = $el.find(`option:contains(${text})`);
        Ember.run(function () {
          $option.prop("selected", true);
          $el.trigger('change');
        });
      };

      this.text = function (selector) {
        return this.$(selector).text();
      };

      this.click = function (selector) {
        let $el = this.$(selector);
        Ember.run($el, 'mousedown');
        this.focus(selector);
        Ember.run($el, 'mouseup');
        Ember.run($el, 'click');
      };

      this.check = function (selector) {
        let $el = this.$(selector);
        let type = $el.prop('type');
        Ember.assert(`To check '${selector}', the input must be a checkbox`,
                     type === 'checkbox');

        if (!$el.prop('checked')) {
          this.click(selector);
        }
      };

      this.uncheck = function (selector) {
        let $el = this.$(selector);
        let type = $el.prop('type');
        Ember.assert(`To check '${selector}', the input must be a checkbox`,
                     type === 'checkbox');

        if ($el.prop('checked')) {
          this.click(selector);
        }
      };

      this.focus = function (selector) {
        let $el = this.$(selector);
        if (!document.hasFocus || document.hasFocus()) {
          Ember.run($el, 'focus');
        } else {
          Ember.run($el, 'trigger', 'focusin');
        }
      };

      this.blur = function (selector) {
        let $el = this.$(selector);
        if (!document.hasFocus || document.hasFocus()) {
          Ember.run($el, 'blur');
        } else {
          Ember.run($el, 'trigger', 'focusout');
        }
      };

      this.fillIn = function (selector, text) {
        let $el = this.$(selector);
        this.focus(selector);
        Ember.run(function () {
          $el.val(text);
          $el.trigger('input');
          $el.change();
        });
      };

      this.keyEvent = function (selector, type, keyCode) {
        this.triggerEvent(selector, type, {
          keyCode,
          which: keyCode
        });
      };

      this.triggerEvent = function (selector, type, options) {
        let $el = this.$(selector);
        let evt = Ember.$.Event(type, options);
        Ember.run($el, 'trigger', evt);
      };

      if (options.beforeEach) {
        options.beforeEach.apply(this, arguments);
      }
    },

    teardown() {
      if (options.afterEach) {
        options.afterEach.apply(this, arguments);
      }
    }
  });
}
