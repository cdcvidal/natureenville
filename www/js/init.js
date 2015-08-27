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


function init() {
    //Manage geolocation when the application goes to the background
    document.addEventListener('resume', function() {
        currentPos.watch();
    }, false);
    document.addEventListener('pause', function() {
        currentPos.unwatch();
    }, false);
    currentPos.watch();

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

    var containerView = require('./container/container');
    containerView.render().$el.appendTo('body');

    Backbone.history.start();
}

if (window.cordova) {
    document.addEventListener("deviceready", init, false);
} else {
    $(document).ready(init);
}
