'use strict';

/*
 * Dependencies
 */
var $ = require('jquery'),
    _ = require('lodash'),
    DialogView = require('./dialogView'),
    Swiper = require('swiper');


var TimeFormView = DialogView.extend({

    tagName: 'div',
    id: 'time-form',
    className: 'swiper-container',

    changed: false,

    dialogOptions: {
        title: '<span class="glyphicon glyphicon-time"></span> Durée maximale',
        cssClass: 'bottom-sheet theme-yellow has-close-btn-ok body-no-padding',
    },

    initialize: function(options) {
        // Generate HTML content
        var i,
            timeSteps = this.model.timeSteps,
            $wrapper = $('<div class="swiper-wrapper"></div>');
        $wrapper.appendTo(this.$el);
        for (i in timeSteps) {
            $('<div class="swiper-slide" data-value="' + timeSteps[i].value + '">' + timeSteps[i].label + '</div>').appendTo($wrapper);
        }

        DialogView.prototype.initialize.apply(this, arguments);
    },

    onClose: function (dialog) {
        if (this.changed) {
            this.model.trigger('reload');
        }
    },

    afterRender: function() {
        // Find index of the requested time
        var req = parseInt(this.model.get('option_temps')),
            stepIndex = _.findIndex(this.model.timeSteps, function(s) {
                return s.value === req;
            }) || 0;

        // Swiper configuration
        // Note: the swiper could be initialized before DOM attachment, but it would require static width/height then...
        this.swiper = new Swiper(this.el, {
            direction: 'vertical',
            loop: false,
            centeredSlides: true,
            slidesPerView: 'auto',
            initialSlide: stepIndex,
            mousewheelControl: true,
            spaceBetween: 10,
            effect: 'coverflow',
            coverflow: {
                rotate: 0,
                stretch: 0,
                depth: 300,
                modifier: -1,
                slideShadows : false
            },
            runCallbacksOnInit: false,
            onSlideChangeEnd: _.bind(function(swiper) {
                this.changed = true;
                this.model.set('option_temps', this.model.timeSteps[swiper.activeIndex].value);
            }, this)
        });
    }
});

module.exports = TimeFormView;

/*
 * TODO:
 * - fix sizing/positionning (need Vincent's help)
 */
 