'use strict';

var Backbone = require('backbone');

function init() {
    Backbone.history.start();
}

if (window.cordova) {
    document.addEventListener("deviceready", init, false);
} else {
    var $ = require('jquery');
    $(document).ready(init);
}
