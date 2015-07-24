'use strict';

var Backbone = require('backbone'),
    $ = require('jquery');


Backbone.LocalStorage = require("backbone.localstorage");

var MagicTour = Backbone.Model.extend({
    defaults: function() {
        return {
            nb_stops: "2",
            stops: [],
            t_length: "0",
            time: "0",
            trip: []
      };
    },

    initialize: function () {

    },

    url: 'http://dev.optitour.fr/magic/naturalsolution/magictour/',

    parse: function(response, options){
        return response.tours[0];
    }

});
var MagicTourCollection = Backbone.Collection.extend({

    model: MagicTour,
	url: 'http://dev.optitour.fr/magic/naturalsolution/magictour/',
	localStorage: new Backbone.LocalStorage("MagicTourCollection")

});

Backbone.$ = $;

module.exports = {
    MagicTour: MagicTour,
    MagicTourCollection: MagicTourCollection
};