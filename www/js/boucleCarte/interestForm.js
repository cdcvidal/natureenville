'use strict';

/*
 * Dependencies
 */
var $ = require('jquery'),
    DialogView = require('./dialogView');

/*
 * Data
 * FIXME: would rather come from a reference data module or something like that
 */
var interests = {
    parc: {
        label: 'Parcs et Jardins',
        code: 3
    },
    avenue_bordee: {
        label: 'Avenues Bordées',
        code: 1
    },
    lieu_insolite: {
        label: 'Lieux insolites',
        code: 4
    }
};

var InterestFormView = DialogView.extend({

    tagName: 'ul',
    id: 'interest-form',

    events: {
        'click li': 'onClick'
    },

    dialogOptions: {
        title: '<span class="glyphicon glyphicon-heart"></span> Centres d\'Intérêts',
        cssClass: 'bottom-sheet theme-orange'
    },

    initialize: function(attributes, options) {
        // Decode request data
        this.req = JSON.parse(this.model.get('etype_einflu'));

        // Generate HTML content
        var k, $li;
        for (k in interests) {
            $li = $('<li class="interest-' + interests[k].code + '" data-code="' + interests[k].code + '">' + interests[k].label + '</li>');
            if (interests[k].code in this.req && parseInt(this.req[interests[k].code]) > 0) {
                $li.addClass('active');
            }
            $li.appendTo(this.$el);
        }

        DialogView.prototype.initialize.call(this, attributes, options);
    },

    onClick: function(evt) {
        // Handle item selection
        var $li = $(evt.target);
        $li.toggleClass('active');
        this.req[$li.data('code')] = $li.hasClass('active') * 1; // Cast true/false to a weight of 1/0
        this.model.set('etype_einflu', JSON.stringify(this.req));
    }
});

module.exports = InterestFormView;

/*
 * TODO:
 * - Move interests data structure to a shared module
 * - set up icons and fonts
 */