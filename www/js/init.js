'use strict';
var Backbone = require('backbone'),
    $ = require('jQuery'),
    currentPos = require('./current-position'),
    moment = require('moment');

window._ = require('lodash');

var magicTour = require('./models/magictour');
var magicTourInstance = require('./models/magictour').instance;
var magicTourRequest = require('./models/magictourrequest');

var deferreds = [];


function init() {
    //Manage geolocation when the application goes to the background
    document.addEventListener('resume', function() {
        currentPos.watch();
    }, false);
    document.addEventListener('pause', function() {
        currentPos.unwatch();
    }, false);
    currentPos.watch();
    deferreds.push(currentPos.promise());

    $.when.apply(null, deferreds).done(function() {
        var currentMagicTour = new magicTour.MagicTour();
        var currentMagicTourrequest = new magicTourRequest.MagicTourRequest({
            user_id: 'f6f7d00b53428a390d04a63bd3d2f3e5f81b0f6e',
            // arr_x: currentPos.get('longitude'),
            // arr_y: currentPos.get('latitude'),
            option_date: moment().format("DD/MM/YYYY"),
            // dep_x: currentPos.get('longitude'),
            // dep_y: currentPos.get('latitude')
        });
        currentMagicTour.fetch({
            data: currentMagicTourrequest.attributes,
            type: 'POST',
            success: function(responseData) {
                magicTourInstance.set(responseData.attributes);
                var containerView = require('./container/container').instance;
                containerView.render().$el.appendTo('body');
                Backbone.history.start();
            },
            error: function(error) {
                console.log(error);
            }
        });
    });
}

if (window.cordova) {
    document.addEventListener("deviceready", init, false);
} else {
    $(document).ready(init);
}
