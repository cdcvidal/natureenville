'use strict';

var baseview = require('../baseview');

var homeView = baseview.extend({
        template: require('./home.html'),

        serialize: function () {
            return {
                msg: 'Nature en Ville !'
            };
        }
    });

module.exports = {
    action: function() {
        var v = new homeView();
        v.render().$el.appendTo('#main');
    },
    view: homeView
};
