'use strict';

var BaseView = require('../baseview');

var HomeView = BaseView.extend({
    template: require('./home.html')
});

module.exports = HomeView;
