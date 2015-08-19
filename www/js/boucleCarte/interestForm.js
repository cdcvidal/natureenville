'use strict';

/*
 * Dependencies
 */
var $ = require('jquery'),
    Dialog = require('bootstrap-dialog');

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

/*
 * Handle item selection
 */
function onClick(evt) {
    /*jshint validthis: true */
    $(this).toggleClass('active');
}

/*
 * Template, sort of...
 */
var $ul = $('<ul id="interest-form" />'),
    k, $li;
for (k in interests) {
    $li = $('<li class="interest-' + interests[k].code + '">' + interests[k].label + '</li>');
    $li.on('click', onClick);
    $ul.append($li);
}

// Module export a dialog ready to be opened
module.exports = new Dialog({
    title: '<span class="glyphicon glyphicon-heart"></span> Centres d\'Intérêts',
    message: $ul,
    cssClass: 'bottom-sheet theme-orange'
});

/*
 * TODO:
 * - Move interests data structure to a shared module
 * - R/W link with currentMagicTourrequest0
 * - set up icons and fonts
 */