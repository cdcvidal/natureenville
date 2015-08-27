'use strict';

var Backbone = require('backbone'),
    controller = require('./controller');

var Router = Backbone.Router.extend({
    routes: {
        '': 'homeViewDisplay',
        'profile': 'profileViewDisplay',
        'loop/map': 'boucleCarteViewDisplay',
        'loop/details': 'boucleDetailViewDisplay',
        'fiche/:poiId': 'ficheViewDisplay',
        'contribution': 'contributionViewDisplay'
    },

    homeViewDisplay: function() {
        controller.homeViewDisplay();
    },

    profileViewDisplay: function() {
        controller.profileViewDisplay();
    },

    boucleDetailViewDisplay: function() {
        controller.boucleDetailViewDisplay();
    },

    boucleCarteViewDisplay: function() {
        controller.boucleCarteViewDisplay();
    },

    contributionViewDisplay: function() {
        controller.contributionViewDisplay();
    },

    ficheViewDisplay: function() {
        controller.ficheViewDisplay();
    }
});

module.exports = new Router();