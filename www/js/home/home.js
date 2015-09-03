'use strict';

var BaseView = require('../baseview');

var HomeView = BaseView.extend({
    sectionClass: 'section-home',
    template: require('./home.html'),
    title: 'ACCUEIL'
});

module.exports = HomeView;
