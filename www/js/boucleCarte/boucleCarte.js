'use strict';

/*
 * Dependencies
 */
var baseview = require('../baseview'),
    currentPos = require('../current-position'),
    $ = require('jquery'),
    ol = require('planet-maps/dist/ol-base'),
    bootstrap = require('bootstrap'),
    dialog = require('bootstrap-dialog'),
    _ = require('lodash')
    ;

/*
 * Utilities
 */
function getScaleFactor(resolution) {
    // Compute a scale factor depending on resolution
    if (resolution > 10) {
        return 2;
    } else if (resolution > 2) {
        return 3;
    } else if (resolution > 0.1) {
        return 5;
    } else if (resolution > 0.05) {
        return 6;
    } else {
        return 8;
    }
}
function colorFromType(poiType) {
    // Assign a color for a POI type
    var color = [0,0,0]; // Defaults to black
    switch (poiType) {
        // General type 1
        case 7:
            color = [149, 228, 46];
            break;
        // General type 2
        case 3:
            color = [15, 253, 96];
            break;
        // General type 3
        case 1:
        case 2:
        case 11:
        case 12:
        case 13:
            color = [245, 0, 87];
            break;
        // General type 4
        case 10:
            color = [237, 100, 18];
            break;
        // General type 5
        case 6:
            color = [0, 176, 255];
            break;
        // General type 6
        case 9:
            color = [176, 0, 255]; // Not part of Vivien's design
            break;
        // General type 7
        case 4:
        case 5:
            color = [46, 149, 228]; // Not part of Vivien's design
            break;
        // General type 8
        case 8:
            color = [153, 153, 153]; // Not part of Vivien's design
            break;
    }
    return color;
}

/*
 * OpenLayers map configuration
 */
var view = new ol.View(), // Map visible area (parameters will be set during view rendering)
    tripSource = new ol.source.Vector(), // Datasource for trips
    poiSource = new ol.source.Vector(), // Datasource for POIs
    wktParser = new ol.format.WKT(), // WKT parser will decode geometries from the MagicTour data
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
                style: function(feature, resolution) {
                    var g = feature.getGeometry(),
                        sf = getScaleFactor(resolution),
                        styles = [
                            new ol.style.Style({
                                stroke: new ol.style.Stroke({
                                    color: '#46b992',
                                    width: 1*sf
                                })
                            })
                        ],
                        dist = 0;

                    if (resolution > 5) {
                        // Do not draw any arrow above this resolution
                        return styles;
                    }

                    g.forEachSegment(function(start, end) {
                        var dx = end[0] - start[0],
                            dy = end[1] - start[1],
                            rotation = Math.atan2(dy, dx);

                        // Compute cumulative length
                        dist += Math.sqrt(dx*dx + dy*dy);
                        if (dist < 3000/(sf*sf)) {
                            // Do not draw before a certain distance threshold 
                            return;
                        } else {
                            // Reset distance accumulator
                            dist = 0;
                            // Draw an arrow at the end of this segment
                            styles.push(
                                new ol.style.Style({
                                    geometry: new ol.geom.Point(end),
                                    image: new ol.style.Icon({
                                        src: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="6" height="6"><polyline points="2,1 4,3 2,5" fill="none" stroke="#46b992" stroke-width="1" /></svg>',
                                        anchor: [0.5, 0.5],
                                        scale: 1*sf,
                                        rotateWithView: false,
                                        rotation: -rotation
                                    })
                                })
                            );
                        }
                    });
                    return styles;
                }
            }),
            // Layer 3: POIs
            new ol.layer.Vector({
                source: poiSource,
                style: function(feature, resolution) {
                    var sf = getScaleFactor(resolution),
                        color = colorFromType(parseInt(feature.l.place_type)); // FIXME: why using this ".l"??? Looks like a bug in OL? Or in planet-maps build?
                    if (resolution > 50) {
                        // Do not display POI
                        return [];
                    } else if (resolution > 5) {
                        // Display POI as a simple small circle
                        return [new ol.style.Style({
                            image: new ol.style.Circle({
                                radius: 2*sf,
                                fill: new ol.style.Fill({
                                    color: color.concat(1)
                                })
                            })
                        })];
                    } else {
                        // Display POI with semi-opaque fill + plain edge
                        return [new ol.style.Style({
                            image: new ol.style.Circle({
                                radius: 2*sf,
                                fill: new ol.style.Fill({
                                    color: color.concat(0.5)
                                }),
                                stroke: new ol.style.Stroke({
                                    color: color.concat(1),
                                    width: 1*sf
                                })
                            })
                        })];
                    }
                }
            })
        ],
        view: view
    });

/*
 * Backbone view
 */
var boucleCarteView = baseview.extend({
    template: require('./boucleCarte.html'),

    events: {
        'click .btn-interest': 'onBtnInterestClick',
        'click .btn-position': 'onBtnPositionClick',
        'click .btn-distance': 'onBtnDistanceClick',
        'click .btn-time': 'onBtnTimeClick'
    },

    initialize: function () {
        this.listenTo(this.model, 'change', this.reload);
        this.listenTo(this.model.request, 'change', this.updateButtonLabels);
        baseview.prototype.initialize.call(this, arguments);
    },

    displayTrips: function() {
        // Clear vector layer beforehand
        tripSource.clear();

        var trips = this.model.get('trip') || [],
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
    },

    displayPOIs: function() {
        // Clear vector layer beforehand
        poiSource.clear();

        var pois = this.model.get('stops') || [],
            // Iterate over POIs, parse them and build ol.Feature for OL display
            features = pois.map(function (poi, idx, arr) {
                return new ol.Feature({
                    geometry: wktParser.readGeometry(poi.geom).transform('EPSG:4326', 'EPSG:3857'), // Convert GPX/WGS84 coordinates to Spherical Mercator (which is the basemap projection)
                    place_type: poi.place_type,
                    place_name: poi.place_name
                });
            });
        // Add features to the vector layer
        poiSource.addFeatures(features);
    },

    reload: function () {
        this.displayTrips();
        this.displayPOIs();
        view.fit(tripSource.getExtent(), map.getSize());
    },

    centerOnCurrentPosition: function () {
        view.setZoom(15);
        view.setCenter(ol.proj.transform([currentPos.get('longitude'), currentPos.get('latitude')], 'EPSG:4326', 'EPSG:3857'));
    },

    updateButtonLabels: function () {
        this.$el.find('.btn-distance .badge').text(this.model.request.getDistanceKm() + ' Km');
    },

    afterRender: function () {
        this.updateButtonLabels();

        // show trips and POIs
        this.displayTrips();
        this.displayPOIs();

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
    },

    onBtnInterestClick: function(e) {
        e.preventDefault();
        var InterestFormView = require('./interestForm.js'),
            dialog = new InterestFormView({model: this.model.request});
        dialog.render();
    },

    onBtnPositionClick: function(e) {
        e.preventDefault();
        require('./positionForm.js').open();
    },

    onBtnDistanceClick: function(e) {
        e.preventDefault();
        var DistanceFormView = require('./distanceForm.js'),
            dialog = new DistanceFormView({model: this.model.request});
        dialog.render();
    },

    onBtnTimeClick: function(e) {
        e.preventDefault();
        var TimeFormView = require('./timeForm.js'),
            dialog = new TimeFormView({model: this.model.request});
        dialog.render();
    }
});

module.exports = {
    view: boucleCarteView
};
