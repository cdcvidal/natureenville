'use strict';
var Backbone = require('backbone'),
    $ = require('jQuery');
window._ = require('lodash');

var magicTour = require('./models/magictour');
var magicTourRequest = require('./models/magictourrequest');

var deferreds = [];


function init() {
    //Manage geolocation when the application goes to the background
    document.addEventListener('resume', function() {
        getPosition();
    }, false);
    document.addEventListener('pause', function() {
        clearPosition();
    }, false);
    var GeoModel = Backbone.Model.extend();
    var geoModel = new GeoModel();
    getPosition(geoModel);
    var geoldfd = $.Deferred();
    // Wait first response of Geolocation API before starting app
    geoModel.once('change:coords', function() {
        this.resolve(console.log(geoModel.attributes));
    }, geoldfd);
    deferreds.push(geoldfd);

    $.when.apply(null, deferreds).done(function() {
        var currentMagicTour = new magicTour.MagicTour();
        var currentMagicTourrequest = new magicTourRequest.MagicTourRequest({
            user_id: 'f6f7d00b53428a390d04a63bd3d2f3e5f81b0f6e',
            arr_x: geoModel.get('longitude'),
            arr_y: geoModel.get('latitude'),
            option_date: new Date().format("dd/MM/yyyy"),
            dep_x: geoModel.get('longitude'),
            dep_y: geoModel.get('latitude'),
        });

        currentMagicTour.fetch({
            data: currentMagicTourrequest.attributes,
            type: 'POST',
            success: function(responseData) {
                //TODO app variable
                window.magicTour = responseData;
                var ContainerView = require('./container/container').action,
                    containerView = new ContainerView();
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

//TODO module utilities
/**
 * geolocation
 */

function getPosition(geoModel) {
    var options = {
            enableHighAccuracy: false,
            maximumAge: 10000,
            timeout: 60000
        },
        geolocId = navigator.geolocation.watchPosition(
            function(position) {
                geoModel.set({
                    'coords': position.coords
                });
                $('#geoloc').remove();
            },
            function(error) {
                geoModel.clear();
                console.log('ERROR(' + error.code + '): ' + error.message);
                if (error.code === 2 || error.code === 1 || error.code === 0) {
                    alert('PAS DE POSITION: ' + error.code);
                }
                clearPosition(geolocId);
                getPosition();
            },
            options

        );
    var timeout = setTimeout(function() {
        navigator.geolocation.clearWatch(geolocId);
    }, 5000);
    return geolocId;
}

function clearPosition() {
    if (getPosition()) {
        navigator.geolocation.clearWatch(getPosition());
    }
}


/**
 * Formatage Date
 */

Date.prototype.format = function(format) {
    var o = {
        "M+": this.getMonth() + 1, //month
        "d+": this.getDate(), //day
        "h+": this.getHours(), //hour
        "m+": this.getMinutes(), //minute
        "s+": this.getSeconds(), //second
        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
        "S": this.getMilliseconds() //millisecond
    };

    if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(format))
            format = format.replace(RegExp.$1,
                RegExp.$1.length == 1 ? o[k] :
                ("00" + o[k]).substr(("" + o[k]).length));
    return format;
};