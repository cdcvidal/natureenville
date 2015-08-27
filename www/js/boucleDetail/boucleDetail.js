'use strict';

var BaseView = require('../baseview');
var $ = require('jquery');
var utilities = require('../utilities');

var BoucleDetailView = BaseView.extend({
    template: require('./boucleDetail.html'),

    initialize: function () {
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

    toggleTab: function() {
        this.$el.toggleClass('active');
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

module.exports = BoucleDetailView;
