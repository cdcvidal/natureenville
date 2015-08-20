'use strict';

/*
 * Dependencies
 */
var $ = require('jquery'),
    Dialog = require('bootstrap-dialog');

/*
 * (Basic) template
 */
var html = '<p id="position-form">' +
           '  <span class="glyphicon glyphicon-screenshot"></span>' +
           '  <input type="text" placeholder="Ma position" />' +
           '</p>',
    $html = $(html);

// Module export a dialog ready to be opened
module.exports = new Dialog({
    title: '<span class="glyphicon glyphicon-map-marker"></span> Point de départ',
    message: $html,
    cssClass: 'bottom-sheet theme-magenta'
});

/*
 * TODO:
 * - R/W link with currentMagicTourrequest
 * - geocoding + autocomplete
 */