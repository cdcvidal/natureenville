'use strict';

/*
 * Dependencies
 */
var $ = require('jquery'),
    generalTypes = require('../models/generaltypepoi'),
    DialogView = require('./dialogView');

var InterestFormView = DialogView.extend({

    tagName: 'ul',
    id: 'interest-form',

    changed: false,

    events: {
        'click li': 'onClick'
    },

    dialogOptions: {
        title: '<span class="glyphicon glyphicon-heart"></span> Centres d\'Intérêts',
        cssClass: 'bottom-sheet theme-orange'
    },

    initialize: function(attributes, options) {
        // Decode request data
        var req = this.req = JSON.parse(this.model.get('etype_einflu')),
            $el = this.$el;

        // Generate HTML content
        generalTypes.each(function(gType) {
            var $li = $('<li class="interest-' + gType.id + '" data-id="' + gType.id + '">' + gType.get('name_fr') + '</li>');
            if (gType.id in req && parseInt(req[gType.id]) > 0) {
                $li.addClass('active');
            }
            $li.appendTo($el);
        });

        DialogView.prototype.initialize.call(this, attributes, options);
    },

    onClose: function (dialog) {
        if (this.changed) {
            this.model.set('etype_einflu', JSON.stringify(this.req));
            this.model.trigger('reload');
        }
    },

    onClick: function(evt) {
        // Handle item selection
        var $li = $(evt.target);
        $li.toggleClass('active');
        this.req[$li.data('id')] = $li.hasClass('active') * 1; // Cast true/false to a weight of 1/0

        this.changed = true;
    }
});

module.exports = InterestFormView;

/*
 * TODO:
 * - set up icons and fonts
 */