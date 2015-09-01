'use strict';

var Backbone = require('backbone'),
    controller = require('./controller');

var Router = Backbone.Router.extend({
    routes: {
        '': 'homeViewDisplay',
        'profile': 'profileViewDisplay',
        'loop': 'loopAction',
        'loop/:tab': 'loopAction', // Allowed values for tab: 'map' or 'details'
        'direction': 'directionAction',
        'direction/:tab': 'directionAction', // Allowed values for tab: 'map' or 'details'
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
        controller.tourContainerViewDisplay('loop', tab);
    },

    directionAction: function(tab) {
        controller.tourContainerViewDisplay('direction', tab);
    },

    contributionViewDisplay: function() {
        controller.contributionViewDisplay();
    },

    ficheViewDisplay: function(poiId) {
        controller.ficheViewDisplay(parseInt(poiId));
    }
});

module.exports = new Router();