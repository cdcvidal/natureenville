'use strict';

var baseview = require('../baseview');
var $ = require('jquery');

var homeView = baseview.extend({
        template: require('./home.html'),
        initialize: function () {
        },
        events: {

        },
        serialize: function () {
            return {
                msg: 'Il faut mettre un truc ICI!'
            };
        },


    });

module.exports = {
    action: function() {
    },

    view: homeView
};
