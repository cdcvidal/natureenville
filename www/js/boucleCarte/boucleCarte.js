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
    map = new ol.Map({
        layers: [
            // Layer 1: Basemap
            new ol.layer.Tile({
                source: new ol.source.XYZ({
                    attributions: new ol.Attribution({
                        html: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors.'
                    }),
                    crossOrigin: 'anonymous',
                    opaque: true,
                    maxZoom: 19,
                    url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
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

        afterRender: function () {
            // center on current position only at first render, otherwiser reload map at previous location
            if (! view.getCenter()) {
                view.setZoom(15);
                view.setCenter(ol.proj.transform([currentPos.get('longitude'), currentPos.get('latitude')], 'EPSG:4326', 'EPSG:3857'));
            }
            // Attach map to the DOM (to the #map element)
            map.setTarget('map');
        },

        serialize: function () {
            return {};
        }
    });

module.exports = {
    view: boucleCarteView
};
