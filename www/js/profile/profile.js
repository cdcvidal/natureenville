'use strict';

var baseview = require('../baseview');

var profileView = baseview.extend({
        template: require('./profile.html'),

        serialize: function () {
            return {
                msg: 'Profile!'
            };
        }
    });

module.exports = {
    action: function() {
        console.log();
        var v = new profileView();
        v.render().$el.appendTo('#main');
    },
    view: profileView
};
