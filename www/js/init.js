'use strict';
var Backbone = require('backbone');
var bootstrap = require('bootstrap');
var $ = require('jquery');


function init() {
    var ContainerView = require('./container/container').action,
    containerView = new ContainerView();
    Backbone.history.start();
}

if (window.cordova) {
    document.addEventListener("deviceready", init, false);
} else {
    var $ = require('jQuery');
    $(document).ready(init);
}
