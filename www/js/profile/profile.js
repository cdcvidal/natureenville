'use strict';

var BaseView = require('../baseview');

var ProfileView = BaseView.extend({
        template: require('./profile.html'),

        serialize: function () {
            return {
                model: this.model,
                collection: this.collection
            };
        }
    });

module.exports = ProfileView;
