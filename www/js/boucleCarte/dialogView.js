'use strict';

/*
 * Dependencies
 */
var Backbone = require('backbone'),
    _ = require('lodash'),
    Dialog = require('bootstrap-dialog');


var DialogView = Backbone.View.extend({

    dialogOptions: {},

    initialize: function (attributes, options) {
        this.dialogOptions.message = this.el;
        this.dialogOptions.onshown = _.bind(this.afterRender, this);
        this.dialog = new Dialog(this.dialogOptions);
    },

    // Can be overridden by child classes
    beforeRender: function () {},
    afterRender: function () {},

    render: function() {
        this.beforeRender();
        this.dialog.open();
    }
});

module.exports = DialogView;
