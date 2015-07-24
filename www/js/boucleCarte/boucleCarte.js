'use strict';

var baseview = require('../baseview');
var $ = require('jquery');

var boucleCarteView = baseview.extend({
        template: require('./boucleCarte.html'),
        initialize: function () {
        },
        events:{

        },
        serialize: function () {
            return {
                parcours: this.model
            };
        }

    });

module.exports = {
    action: function() {

    },

    view: boucleCarteView
};
