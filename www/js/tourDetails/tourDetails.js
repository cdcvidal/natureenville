'use strict';

var BaseView = require('../baseview');
var $ = require('jquery');
var _ = require('lodash');
var utilities = require('../utilities');

var TourDetailsView = BaseView.extend({
    template: require('./tourDetails.html'),
    activeTab: false,

    initialize: function () {
        this.listenTo(this.model, 'change', this.render);
        this.listenTo(this.model, 'request', this.render);

        BaseView.prototype.initialize.apply(this, arguments);
    },

    serialize: function () {
        //TODO: tmp
        if ( !this.model.isEmpty ) {
            _.forEach(this.model.attributes.stops, function(stop) {
                stop.generalType = _.random(1, 8);
            });
        }
        return {
            active: this.activeTab ? 'active' : '',
            stops: this.model.isEmpty ? [] : this.model.attributes.stops,
            formatPoiPosition: function(stop) {
                return utilities.formatMinutes(stop.departure);
            }
        };
    },

    switchTabContent: function(active) {
        this.activeTab = active;
        if (this.activeTab) {
            this.$el.addClass('active');
        } else {
            this.$el.removeClass('active');
        }
    },

    afterRender: function() {
        this.$el.find('.collapse').on('show.bs.collapse', function (e) {
            $(e.currentTarget).parent().addClass('open');
        });
        this.$el.find('.collapse').on('hide.bs.collapse', function (e) {
            $(e.currentTarget).parent().removeClass('open');
        });
    }
});

module.exports = TourDetailsView;
