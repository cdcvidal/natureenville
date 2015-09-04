'use strict';

/*
 * Dependencies
 */
var Backbone = require('backbone'),
    _ = require('lodash'),
    bootstrap = require('bootstrap'),
    Dialog = require('bootstrap-dialog');


var DialogView = Backbone.View.extend({

    dialogOptions: {},

    initialize: function (options) {
        this.dialogOptions.message = this.el;
        this.dialogOptions.onshown = _.bind(this.afterRender, this);
        this.dialogOptions.onhidden = _.bind(this.onClose, this);
        this.dialog = new Dialog(this.dialogOptions);
    },

    // Can be overridden by child classes
    beforeRender: function () {},
    afterRender: function () {
        var self = this;
        this.dialog.getModalHeader().find('.bootstrap-dialog-close-button').click(function() {
            self.isSubmit = true;
        });
    },
    onClose: function (dialog) {},

    render: function() {
        this.beforeRender();
        this.dialog.open();
    }
});

module.exports = DialogView;
