'use strict';

/*
 * Dependencies
 */
var baseview = require('../baseview'),
    currentPos = require('../current-position'),
    $ = require('jquery'),
    ol = require('planet-maps/dist/ol-base');

/*
 * OpenLayers map configuration
 */
var view = new ol.View(), // Map visible area (parameters will be set during view rendering)
    tripSource = new ol.source.Vector(), // Datasource for trips
    wktParser = new ol.format.WKT(), // WKT parser will decode geometries from the 
    map = new ol.Map({
        layers: [
            // Layer 1: Basemap
            new ol.layer.Tile({
                source: new ol.source.XYZ({
                    url: 'http://{a-d}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
                    attributions: [new ol.Attribution({ html: ['&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'] })]
                })
            }),
            // Layer 2: Trips
            new ol.layer.Vector({
                source: tripSource,
                style: new ol.style.Style({
                    stroke: new ol.style.Stroke({
                        color: '#46b992',
                        width: 3
                    })
                })
            })
        ],
        view: view
    });

/*
 * Backbone view
 */
var boucleCarteView = baseview.extend({
        template: require('./boucleCarte.html'),

        displayTrips: function() {
            // Clear vector layer beforehand
            tripSource.clear();

            var features,
                trips = this.model.get('trip');

            if (trips) {
                // Iterate over trip segments and prepare them for OL display
                features = trips.map(function (trip, idx, arr) {

                    // Parse a segment and build an OL feature
                    var feature = wktParser.readFeature(trip.geom);

                    // Convert GPX/WGS84 coordinates to Spherical Mercator (which is the basemap projection)
                    feature.getGeometry().transform('EPSG:4326', 'EPSG:3857');

                    return feature;
                });
                // Add features to the vector layer
                tripSource.addFeatures(features);
            }
        },

        centerOnCurrentPosition: function () {
            view.setZoom(15);
            view.setCenter(ol.proj.transform([currentPos.get('longitude'), currentPos.get('latitude')], 'EPSG:4326', 'EPSG:3857'));
        },

        afterRender: function () {
            // show trips
            this.displayTrips();

            // Attach map to the DOM (to the #map element)
            map.setTarget('map');

            // At first render, compute a visible area and display it, otherwiser reload map with the previous visibla area
            if (! view.getCenter()) {
                if (tripSource.getFeatures().length > 0) {
                    // Make trip visible
                    view.fit(tripSource.getExtent(), map.getSize());
                } else {
                    // Make user's current position visible
                    this.centerOnCurrentPosition();
                }
            }
        },

        serialize: function () {
            return {};
        }
    });

module.exports = {
    view: boucleCarteView
};
