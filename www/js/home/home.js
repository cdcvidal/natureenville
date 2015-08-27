'use strict';

var BaseView = require('../baseview');

var HomeView = BaseView.extend({
    sectionClass: 'section-home',
    template: require('./home.html')
});

module.exports = HomeView;
