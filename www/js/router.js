'use strict';

var Backbone = require('backbone'),
    controller = require('./controller');

var Router = Backbone.Router.extend({
    routes: {
        '': 'homeViewDisplay',
        'profile': 'profileViewDisplay',
        'loop': 'loopAction',
        'loop/:tab': 'loopAction', // Allowed values for tab: 'map' or 'details'
        'loop/map/:poiId': 'loopShowPoiAction',
        'direction': 'directionAction',
        'direction/:tab': 'directionAction', // Allowed values for tab: 'map' or 'details'
        'direction/map/:poiId': 'directionShowPoiAction',
        'fiche/:poiId': 'ficheViewDisplay',
        'contribution': 'contributionViewDisplay'
    },

    homeViewDisplay: function() {
        controller.homeViewDisplay();
    },

    profileViewDisplay: function() {
        controller.profileViewDisplay();
    },

    loopAction: function(tab) {
        controller.tourContainerViewDisplay('loop', tab || 'map');
    },

    loopShowPoiAction: function(poiId) {
        controller.tourContainerViewDisplay('loop', 'map', parseInt(poiId));
    },

    directionAction: function(tab) {
        controller.tourContainerViewDisplay('direction', tab || 'map');
    },

    directionShowPoiAction: function(poiId) {
        controller.tourContainerViewDisplay('direction', 'map', parseInt(poiId));
    },

    contributionViewDisplay: function() {
        controller.contributionViewDisplay();
    },

    ficheViewDisplay: function(poiId) {
        controller.ficheViewDisplay(parseInt(poiId));
    }
});

module.exports = new Router();