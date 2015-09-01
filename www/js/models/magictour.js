'use strict';

var Backbone = require('backbone'),
    _ = require('lodash'),
    moment = require('moment'),
    Step = require('./step'),
    MagicTourRequest = require('./magictourrequest');

Backbone.LocalStorage = require("backbone.localstorage");

var MagicTour = Backbone.Model.extend({
    /* Expected attributes :
        {
            nb_stops: "2",      // Useless, length of the array below
            stops: [],          // An ordered collection of Step instances
            t_length: "0",      // Tour length in meters
            time: "0",          // Tour length in minutes
            trip: []            // Tour path as a list of WKT linestring geometries
        }
    */

    url: 'http://dev.optitour.fr/magic/naturalsolution/magictour/',

    initialize: function() {
        this.isVirgin = true;
        this.isEmpty = true;
        this.request = new MagicTourRequest();
        this.listenTo(this.request, 'reload', this.reload);
    },

    reload: function() {
        this.fetch();
    },

    fetch: function(options) {
        this.isEmpty = true;
        // Always load request for the current day/time
        this.request.set({
            option_date: moment().format("DD/MM/YYYY"),
            option_heure: moment().diff(moment().startOf('day'), 'minutes')
        });
        // Automatically include request params
        options = _.extend({data: this.request.attributes, type: 'POST', validate: true}, options);
        // Relay to original Backbone fetch method
        return Backbone.Model.prototype.fetch.call(this, options);
    },

    validate: function(attrs, options) {
        if ('error' in attrs) {
            return attrs.error;
        }
    },

    clear: function(){
        this.isEmpty = true;
        return Backbone.Model.prototype.clear.apply(this, arguments);
    },

    parse: function(response, options){
        if (response.success && response.tours) {
            this.isVirgin = false;
            this.isEmpty = false;
            var tour = response.tours[0];
            tour.stops = new Backbone.Collection(
                tour.stops.map(function(stop, i) {
                    return new Step(stop, {parse: true});
                })
            );
            return tour;
        } else {
            //TODO manage Optimisation Request Error

            var err = response.Error;
            console.log(err);
            // Mimic backbone behavior if server had used the regular HTTP errors
            this.trigger('error', this, response, options);
            // Let validate() break the process
            return {error: err};
        }
    }
});

module.exports = new MagicTour();
