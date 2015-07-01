'use strict';

var baseview = require('./baseview'),
    $ = require('jquery');

var homeView = baseview.extend({
        template: 'home',

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
