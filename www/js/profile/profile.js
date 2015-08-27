'use strict';

var baseview = require('../baseview');

var profileView = baseview.extend({
        template: require('./profile.html'),

        serialize: function () {
            return {
                model: this.model,
                collection: this.collection
            };
        }
    });

module.exports = profileView;
