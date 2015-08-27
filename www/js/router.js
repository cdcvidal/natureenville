'use strict';

var Backbone = require('backbone'),
    controller = require('./controller');

var Router = Backbone.Router.extend({
    routes: {
        '': 'homeViewDisplay',
        'profile': 'profileViewDisplay',
        'loop': 'tourContainerViewDisplay',
        'fiche/:poiId': 'ficheViewDisplay',
        'contribution': 'contributionViewDisplay'
    },

    homeViewDisplay: function() {
        controller.homeViewDisplay();
    },

    profileViewDisplay: function() {
        controller.profileViewDisplay();
    },

    tourContainerViewDisplay: function() {
        controller.tourContainerViewDisplay();
    },

    contributionViewDisplay: function() {
        controller.contributionViewDisplay();
    },

    ficheViewDisplay: function() {
        controller.ficheViewDisplay();
    }
});

module.exports = new Router();