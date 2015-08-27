'use strict';

var BaseView = require('../baseview');

var ProfileView = BaseView.extend({
    template: require('./profile.html'),
    sectionClass: 'section-loop section-profile',

    serialize: function () {
        return {
            model: this.model,
            collection: this.collection
        };
    }
});

module.exports = ProfileView;
