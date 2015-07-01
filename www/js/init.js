'use strict';

var Backbone = require('backbone');

function init() {
    Backbone.history.start();
}

document.addEventListener("deviceready", init, false);
