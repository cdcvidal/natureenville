'use strict';

/*
 * Dependencies
 */
var DialogView = require('./dialogView');

var PositionFormView = DialogView.extend({

    tagName: 'p',
    id: 'position-form',

    dialogOptions: {
        title: '<span class="glyphicon glyphicon-map-marker"></span> Point de départ',
        cssClass: 'bottom-sheet theme-magenta'
    },

    initialize: function (attributes, options) {
        // Generate HTML content
        this.el.innerHTML = '<span class="glyphicon glyphicon-screenshot"></span> <input type="text" placeholder="Ma position" />';

        DialogView.prototype.initialize.call(this, attributes, options);
    }
});

module.exports = PositionFormView;

/*
 * TODO:
 * - R/W link with currentMagicTourrequest
 * - geocoding + autocomplete
 */