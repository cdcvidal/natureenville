'use strict';

var baseview = require('../baseview');
var $ = require('jquery');

var boucleDetailView = baseview.extend({
        template: require('./boucleDetail.html'),
        initialize: function () {
        },
        events:{

        },
        serialize: function () {
            return {
                parcours: this.model,
                formatPoiPosition: function(stop) {
                    return stop.place_name;
                }
            };
        },
        afterRender: function() {
            var self = this;
            //self.$el.find('.collapse').collapse();
            self.$el.find('.collapse').on('show.bs.collapse', function (e) {
                $(e.currentTarget).parent().addClass('open');
            });
            self.$el.find('.collapse').on('hide.bs.collapse', function (e) {
                $(e.currentTarget).parent().removeClass('open');
            });
        }
    });

module.exports = {
    action: function() {

    },

    view: boucleDetailView
};
