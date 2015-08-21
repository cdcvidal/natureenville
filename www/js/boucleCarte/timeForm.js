'use strict';

/*
 * Dependencies
 */
var $ = require('jquery'),
    DialogView = require('./dialogView'),
    Swiper = require('swiper');

/*
 * Data
 * FIXME: would rather come from a reference data module or something like that
 */
var timeSteps = [
    {value: 10, label: '10min'},
    {value: 15, label: '15min'},
    {value: 20, label: '20min'},
    {value: 25, label: '25min'},
    {value: 30, label: '30min'},
    {value: 40, label: '40min'},
    {value: 50, label: '50min'},
    {value: 60, label: '1h'},
    {value: 75, label: '1h15'},
    {value: 90, label: '1h30'},
    {value: 105, label: '1h45'},
    {value: 120, label: '2h'}
];


var TimeFormView = DialogView.extend({

    tagName: 'div',
    id: 'time-form',
    className: 'swiper-container',

    dialogOptions: {
        title: '<span class="glyphicon glyphicon-time"></span> Durée maximale',
        cssClass: 'bottom-sheet theme-yellow',
    },

    initialize: function(attributes, options) {
        // Generate HTML content
        var i, $wrapper = $('<div class="swiper-wrapper"></div>');
        $wrapper.appendTo(this.$el);
        for (i in timeSteps) {
            $('<div class="swiper-slide" data-value="' + timeSteps[i].value + '">' + timeSteps[i].label + '</div>').appendTo($wrapper);
        }

        DialogView.prototype.initialize.call(this, attributes, options);
    },

    afterRender: function() {
        // Swiper configuration
        // Note: the swiper could be initialized before DOM attachment, but it would require static width/height then...
        this.swiper = new Swiper(this.el, {
            direction: 'vertical',
            loop: false,
            centeredSlides: true,
            slidesPerView: 'auto',
            initialSlide: 5, // TODO
            mousewheelControl: true,
            effect: 'coverflow',
            coverflow: {
                rotate: 0,
                stretch: 0,
                depth: 200,
                modifier: -1,
                slideShadows : false
            },
            onSlideChangeEnd: function(swiper) {
                // Do something with timeSteps[swiper.activeIndex]
            }
        });
    }
});

module.exports = TimeFormView;

/*
 * TODO:
 * - R/W link with currentMagicTourrequest
 * - Move time data structure to a shared module?
 * - fix sizing/positionning (need Vincent's help)
 */
 