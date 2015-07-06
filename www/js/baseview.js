'use strict';

var Backbone = require('backbone');

module.exports = Backbone.View.extend({

    serialize: function () {
        if (this.model) {
            return this.model.toJSON();
        }
        return {};
    },


    // Can be overridden by child classes
    beforeRender: function () {},
    afterRender: function () {},

    render: function (options) {
        // Give a chance to child classes to do something before render
        this.beforeRender();

        var data = this.serialize(),
            rendered,
            rawHtml = this.template(data);

        // Re-use nice "noel" trick from LayoutManager
        rendered = this.$el.html(rawHtml).children();
        this.$el.replaceWith(rendered);
        this.setElement(rendered);


        // Give a chance to child classes to do something after render
        this.afterRender();

        return this;
    }
});