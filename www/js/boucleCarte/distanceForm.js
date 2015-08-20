'use strict';

/*
 * Dependencies
 */
var Slider = require('bootstrap-slider'),
    DialogView = require('./dialogView');


var DistanceFormView = DialogView.extend({

    tagName: 'p',
    id: 'distance-form',

    dialogOptions: {
        title: '<span class="glyphicon glyphicon-road"></span> Distance maximale',
        cssClass: 'bottom-sheet theme-lime'
    },

    initialize: function (attributes, options) {
        // Generate HTML content
        this.el.innerHTML = '1 <input type="text" /> 20';

        // Configure slider
        this.slider = new Slider(this.$el.find('input').get(0), {
            min: 1,
            max: 20,
            tooltip: 'always',
            tooltip_position: 'bottom',
            formatter: function(val) {
                return val + ' Km';
            }
        });

        DialogView.prototype.initialize.call(this, attributes, options);
    },

    afterRender: function() {
        /*
         * initial tooltip positionning is wrong because $elt.offsetWidth is 0
         * offsetWidth is 0 because slider is in this modal which has not been attached to the DOM yet
         * hence, set the value (trigger tooltip positionning) on event shown.bs.modal
         */
        this.slider.setValue(5);
    }
});

module.exports = DistanceFormView;

/*
 * TODO:
 * - R/W link with currentMagicTourrequest0
 * - set up icons
 *      .bootstrap-dialog-title span
 *      .slider-handle.custom + handle: 'custom'
 */