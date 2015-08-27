'use strict';

var BaseView = require('../baseview');
var $ = require('jquery');
var utilities = require('../utilities');

var BoucleDetailView = BaseView.extend({
    template: require('./boucleDetail.html'),
    sectionClass: 'section-loop section-loop-details',

    initialize: function () {
        this.listenTo(this.model, 'request', this.showSpinner);
        this.listenTo(this.model, 'error', this.hideSpinner);
        this.listenTo(this.model, 'change', this.hideSpinner);
        this.listenTo(this.model, 'change', this.render);
        BaseView.prototype.initialize.call(this, arguments);
    },

    serialize: function () {
        return {
            stops: this.model.isEmpty ? [] : this.model.attributes.stops,
            formatPoiPosition: function(stop) {
                return utilities.formatMinutes(stop.departure);
            }
        };
    },

    showSpinner: function () {
        // Show a spinner while loading
        this.$el.find('.loader').show();
    },

    hideSpinner: function () {
        // Hide spinner
        this.$el.find('.loader').hide();
    },

    afterRender: function() {
        if (this.model.isEmpty) {
            this.showSpinner();
        }
        this.$el.find('.collapse').on('show.bs.collapse', function (e) {
            $(e.currentTarget).parent().addClass('open');
        });
        this.$el.find('.collapse').on('hide.bs.collapse', function (e) {
            $(e.currentTarget).parent().removeClass('open');
        });
    }
});

module.exports = BoucleDetailView;
