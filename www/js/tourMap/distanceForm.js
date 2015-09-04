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

    dialogOptions: {
        title: '<span class="material-icons">gesture</span> Distance maximale',
        cssClass: 'bottom-sheet theme-lime has-close-btn-ok'
    },

    initialize: function (options) {
        // Generate HTML content
        this.el.innerHTML = '1 <input type="text" /> 20';

        // Configure slider
        this.slider = new Slider(this.$el.find('input').get(0), {
            min: 1,
            max: 20,
            tooltip: 'always',
            handle: 'custom',
            tooltip_position: 'bottom',
            formatter: function(val) {
                return val + ' Km';
            }
        });

        DialogView.prototype.initialize.apply(this, arguments);
    },

    onClose: function (dialog) {
        var oldValue = this.model.get('option_distance');
        var newValue = this.slider.getValue()*1000;
        if (this.isSubmit && oldValue != newValue ) {
            this.model.set('option_distance', newValue);
            this.model.trigger('reload');
        }
    },

    afterRender: function() {
        /*
         * initial tooltip positionning is wrong because $elt.offsetWidth is 0
         * offsetWidth is 0 because slider is in this modal which has not been attached to the DOM yet
         * hence, set the value (trigger tooltip positionning) on event shown.bs.modal
         */
        this.slider.setValue(this.model.getDistanceKm());

        DialogView.prototype.afterRender.apply(this, arguments);
    }
});

module.exports = DistanceFormView;
