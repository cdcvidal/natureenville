'use strict';

/*
 * Dependencies
 */
var Slider = require('bootstrap-slider'),
    _ = require('lodash'),
    DialogView = require('./dialogView');


var DistanceFormView = DialogView.extend({

    tagName: 'p',
    id: 'distance-form',

    changed: false,

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
        this.slider.on('slideStop', _.bind(this.onSlide, this));

        DialogView.prototype.initialize.call(this, attributes, options);
    },

    onSlide: function(val) {
        this.changed = true;
        this.model.set('option_distance', val*1000);
    },

    onClose: function (dialog) {
        if (this.changed) {
            this.model.trigger('reload');
        }
    },

    afterRender: function() {
        /*
         * initial tooltip positionning is wrong because $elt.offsetWidth is 0
         * offsetWidth is 0 because slider is in this modal which has not been attached to the DOM yet
         * hence, set the value (trigger tooltip positionning) on event shown.bs.modal
         */
        var distance = Math.round(this.model.get('option_distance')/1000);
        this.slider.setValue(distance);
    }
});

module.exports = DistanceFormView;

/*
 * TODO:
 * - set up icons
 *      .bootstrap-dialog-title span
 *      .slider-handle.custom + handle: 'custom'
 */