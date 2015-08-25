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
    },

    afterRender: function() {
        // Geocomplete configuration
        var $input = this.$el.find('input');
        $input.geocomplete({
            country: "FR"
        });
        // Move the DOM fragment to the dialogview so that we can customize it with CSS
        /*
         * FIXME: doesn't work, .pac-container doesn't exist yet and there is not event telling when it will be ready...
         * It's not either possible to tell the autocomplete to pop upward :(
         * Hence, the weird CSS quickfix : min-width on position-form + z-index on .pac-container
         */
        //$('.pac-container').appendTo(this.$el);
    }
});

module.exports = PositionFormView;

/*
 * TODO:
 * - R/W link with currentMagicTourrequest
 * - geocoding + autocomplete
 */