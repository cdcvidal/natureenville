'use strict';

var baseview = require('../baseview');

var homeView = baseview.extend({
    template: require('./home.html')
});

module.exports = homeView;
