'use strict';

var baseview = require('../baseview');
var $ = require('jquery');

var homeView = baseview.extend({
    template: require('./home.html')
});

module.exports = {
    view: homeView
};
