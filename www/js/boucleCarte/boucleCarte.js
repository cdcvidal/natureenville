'use strict';

var baseview = require('../baseview'),
    currentPos = require('../current-position'),
    $ = require('jquery'),
    ol = require('planet-maps/dist/ol-base'),
    bootstrap = require('bootstrap'),
    dialog = require('bootstrap-dialog')
    ;

var view = new ol.View({
        center: [0, 0],
        zoom: 0
    }),
    map = new ol.Map({
        layers: [
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

var boucleCarteView = baseview.extend({
        template: require('./boucleCarte.html'),
        events: {
            'click .btn-interest': 'onBtnInterestClick'
        },
        initialize: function () {
        },
        afterRender: function () {
            // center on current position only at first render, otherwiser reload map at previous location
            if (view.getCenter()[0] === 0 && view.getCenter()[1] === 0) {
                view.setZoom(15);
                view.setCenter(ol.proj.transform([currentPos.get('longitude'), currentPos.get('latitude')], 'EPSG:4326', 'EPSG:3857'));
            }
            map.setTarget('map');
        },
        serialize: function () {
            return {
                parcours: this.model
            };
        },
        onBtnInterestClick: function(e) {

            /* Not very beautyfull but it works */

            var $ul = $('<ul />');

            dialog.show({
                title: '<span class="glyphicon glyphicon-heart"></span> Centres d\'Intérêts',
                message: 'Hi Apple!',
                cssClass: 'bottom-sheet theme-orange'
            });
            e.preventDefault();
        }
    });

module.exports = {
    action: function() {

    },

    view: boucleCarteView
};
