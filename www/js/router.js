'use strict';

var Backbone = require('backbone'),
    controller = require('./controller');

var Router = Backbone.Router.extend({
    routes: {
        '': 'homeViewDisplay',
        'profile': 'profileViewDisplay',
        'loop': 'tourContainerViewDisplay',
        'loop/:tab': 'tourContainerViewDisplay', // Allowed values for tab: 'map' or 'details'
        'fiche/:poiId': 'ficheViewDisplay',
        'contribution': 'contributionViewDisplay'
    },

    homeViewDisplay: function() {
        controller.homeViewDisplay();
    },

    profileViewDisplay: function() {
        controller.profileViewDisplay();
    },

    tourContainerViewDisplay: function(tab) {
        controller.tourContainerViewDisplay(tab);
    },

    contributionViewDisplay: function() {
        controller.contributionViewDisplay();
    },

    ficheViewDisplay: function() {
        controller.ficheViewDisplay();
    }
});

module.exports = new Router();