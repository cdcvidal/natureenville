'use strict';

/*
 * Dependencies
 */
var $ = require('jquery'),
    Slider = require('bootstrap-slider'),
    Dialog = require('bootstrap-dialog');

/*
 * (Basic) template
 */
var $html = $('<p id="distance-form">1 <input type="text" /> 20</p>');

/*
 * Slider configuration
 */
var slider = new Slider($html.find('input').get(0), {
        min: 1,
        max: 20,
        tooltip: 'always',
        tooltip_position: 'bottom',
        formatter: function(val) {
            return val + ' Km';
        }
    });

// Module export a dialog ready to be opened
module.exports = new Dialog({
    title: '<span class="glyphicon glyphicon-road"></span> Distance maximale',
    message: $html,
    cssClass: 'bottom-sheet theme-lime',
    onshown: function() {
        /*
         * initial tooltip positionning is wrong because $elt.offsetWidth is 0
         * offsetWidth is 0 because slider is in this modal which has not been attached to the DOM yet
         * hence, set the value (trigger tooltip positionning) on event shown.bs.modal
         */
        slider.setValue(5);
    }
});

/*
 * TODO:
 * - R/W link with currentMagicTourrequest0
 * - set up icons
 *      .bootstrap-dialog-title span
 *      .slider-handle.custom + handle: 'custom'
 */