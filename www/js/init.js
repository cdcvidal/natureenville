'use strict';
var Backbone = require('backbone'),
    $ = require('jQuery'),
    currentPos = require('./current-position'),
    moment = require('moment'),
    momentFr = require('moment/locale/fr');

var bootstrap = require('bootstrap');
var jqueryNs = require('jquery-ns');
var magicTour = require('./models/magictour');
var badgesInstanceColl = require('./models/badge').instanceColl;
var badgesColl = require('./models/badge').BadgeCollection;

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

    moment.locale('fr');

    var bC = new badgesColl();
    bC.fetch({
        success : function(response){
                if(response.length === 0){
                    console.log('bC fetch response',response);
                    badgesInstanceColl.fetch({
                        ajaxSync: true,
                        success : function(response){
                            response.models.forEach(function(n, key){
                                badgesInstanceColl.add(n).save();
                            });
                        }
                    });
                }else{
                    badgesInstanceColl.fetch();
                }
        }
    });

    $.when.apply(null, deferreds).then(function() {
        magicTour.setRequestParams({
            user_id: 'f6f7d00b53428a390d04a63bd3d2f3e5f81b0f6e',
            // arr_x: currentPos.get('longitude'),
            // arr_y: currentPos.get('latitude'),
            option_date: moment().format("DD/MM/YYYY"),
            // dep_x: currentPos.get('longitude'),
            // dep_y: currentPos.get('latitude')
        });
        return magicTour.fetch({
            type: 'POST'
        });
    }).done(function (responseData) {
        var containerView = require('./container/container').instance;
        containerView.render().$el.appendTo('body');
        Backbone.history.start();
    }).fail(function (error) {
        console.log(error);
    });
}

if (window.cordova) {
    document.addEventListener("deviceready", init, false);
} else {
    $(document).ready(init);
}
