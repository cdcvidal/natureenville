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
                parcours: this.model
            };
        },

    });

module.exports = {
    action: function() {

    },

    view: boucleDetailView
};
