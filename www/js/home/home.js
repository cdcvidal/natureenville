'use strict';

var baseview = require('../baseview');
var $ = require('jquery');

var homeView = baseview.extend({
        template: require('./home.html'),
        initialize: function () {

        },
        serialize: function () {
            return {
                msg: 'Nature en Ville !'
            };
        }
    });

module.exports = {
    action: function() {

    },

    view: homeView
};
