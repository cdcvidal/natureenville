'use strict';

var Backbone = require('backbone');

var BaseView = Backbone.View.extend({

    initialize: function () {
        this._views = {};
    },

    /*
     * SUBVIEW MANAGEMENT
     */

    getViews: function (selector) {
        if (selector in this._views) {
            return this._views[selector];
        }
        return [];
    },

    insertView: function (selector, view) {
        if (!view) {
            view = selector;
            selector = '';
        }
        // Keep a reference to this selector/view pair
        if (!(selector in this._views)) {
            this._views[selector] = [];
        }
        this._views[selector].push(view);
        // Forget this subview when it gets removed
        // WARNING: if view isn't an instance of BaseView, it doesn't trigger any event when removed
        view.once('remove', function (view) {
            var i, found = false;
            for (i = 0; i < this.length; i++) {
                if (this[i].cid === view.cid) {
                    found = true;
                    break;
                }
            }
            if (found) {
                this.splice(i, 1);
            }
        }, this._views[selector]);
    },

    removeViews: function (selector) {
        var view;
        if (selector in this._views) {
            while (this._views[selector].length) {
                view = this._views[selector][0];
                if (!(view instanceof BaseView)) {
                    view.trigger('remove', view);
                }
                view.remove();
            }
        }
    },

    // Take care of sub-views before removing
    remove: function () {
        var selector, viewList, i;
        for (selector in this._views) {
            viewList = this._views[selector];
            for (i in viewList) {
                viewList[i].remove();
            }
        }
        this.trigger('remove', this);
        Backbone.View.prototype.remove.apply(this, arguments);
    },

    /*
     * VIEW RENDERING PROCESS (beforeRender + serialize -> template + afterRender)
     */

    // Should be overridden by child classes
    serialize: function () {
        if (this.model) {
            return this.model.toJSON();
        }
        return {};
    },

    // Must be overridden by child classes
    template: function () {
        /*
         * Usually, this function will be implemented in child views with
         * something as simple as:
         *     template = require('./home.html');
         * See the grunt-broswerify task and node-underscorify transfrom for more information.
         */
        throw 'Views must implement a template function';
    },

    // Can be overridden by child classes
    beforeRender: function () {},
    afterRender: function () {},

    render: function (options) {
        // Give a chance to child classes to do something before render
        this.beforeRender();

        var data = this.serialize(),
            rendered, viewList, selector, i, base,
            rawHtml = this.template(data);

        // Re-use nice "noel" trick from LayoutManager
        rendered = this.$el.html(rawHtml).children();
        this.$el.replaceWith(rendered);
        this.setElement(rendered);

        // Add sub-views
        for (selector in this._views) {
            viewList = this._views[selector];
            base = (selector === '' ? this.$el : this.$el.find(selector));
            for (i in viewList) {
                viewList[i].render();
                viewList[i].$el.appendTo(base);
            }
        }

        // Give a chance to child classes to do something after render
        this.afterRender();

        return this;
    }
});

module.exports = BaseView;
