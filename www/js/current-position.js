'use strict';

var Backbone = require('backbone'),
    _ = require('lodash'), // FIXME: "_ = Backbone._" doesn't work... why?
    $ = Backbone.$;

var GeoModel = Backbone.Model.extend({
    _id: null,

    _dfd: $.Deferred(),

    defaultOptions: {
        enableHighAccuracy: false,
        maximumAge: 10000,
        timeout: 10000
    },

    initialize: function(options) {
        // Allow user to customize geolocation options
        this.options = _.defaults(options || {}, this.defaultOptions);

        // Ensure geolocation callback are called in the context of this model instance
        this._success = _.bind(this._success, this);
        this._error = _.bind(this._error, this);

        // "Resolve" this model after a first position has been found
        this.once('change', function() {
            this._dfd.resolve(this.attributes);
        });
        this.once('error', function(model, error) {
            this._dfd.reject(error);
        });
    },

    _success: function(position) {
        this.isError = false;
        this.set(position.coords);
    },

    _error: function(error) {
        console.log('ERROR(' + error.code + '): ' + error.message);
        this.isError = true;
        this.trigger('error', this, error);
        if( error.code !== 3){
            this.clear(); // Erase position data
            this.unwatch(); // Stop watching because something went wrong
        }
    },

    promise: function() {
        return this._dfd.promise();
    },

    unwatch: function() {
        navigator.geolocation.clearWatch(this._id);
        this._id = null;
    },

    watch: function(options) {
        this._id = navigator.geolocation.watchPosition(
            this._success,
            this._error,
            this.options
        );
    }
});

module.exports = new GeoModel();