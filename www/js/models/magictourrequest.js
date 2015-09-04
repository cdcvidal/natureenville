'use strict';

var Backbone = require('backbone');

Backbone.LocalStorage = require("backbone.localstorage");

var MagicTourRequest = Backbone.Model.extend({
    defaults: {
        user_id: 'f6f7d00b53428a390d04a63bd3d2f3e5f81b0f6e',
        etype_einflu: JSON.stringify({
            1: 0,  // Avenue bordée
            2: 0,  // Arbre remarquable
            3: 1,  // Parc et jardin
            4: 1,  // Lieu insolite
            5: 1,  // Rue végétalisée
            6: 0,  // plante sauvage
            7: 1,  // Jardin potages
            8: 1   // Aménagement paysager
        }),
        language: 'fr',
        option_temps: '120',    // Default duration: 2h
        option_days: '1',
        option_distance: '5000',    // Default length: 5km
        option_with_child: 'true'
    },

    timeSteps: [
        {value: 10, label: '10min'},
        {value: 15, label: '15min'},
        {value: 20, label: '20min'},
        {value: 25, label: '25min'},
        {value: 30, label: '30min'},
        {value: 40, label: '40min'},
        {value: 50, label: '50min'},
        {value: 60, label: '1h00'},
        {value: 75, label: '1h15'},
        {value: 90, label: '1h30'},
        {value: 105, label: '1h45'},
        {value: 120, label: '2h00'},
        {value: 150, label: '2h30'}
    ],

    getTimeLabel: function() {
        var t = parseInt(this.get('option_temps')),
            step = this.timeSteps.filter(function(ts) {
                return ts.value === t;
            });
        if (step.length) {
            return step[0].label;
        } else {
            return '';
        }
    },

    getDistanceKm: function() {
        return Math.round(this.get('option_distance') / 1000);
    },

    validate: function(attrs, options) {
        if (!(attrs.dep_x && attrs.dep_y && attrs.arr_x && attrs.arr_y)) {
            return 'Departure or destination is missing';
        }
    }
});

module.exports = MagicTourRequest;