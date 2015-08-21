'use strict';

var Backbone = require('backbone');

Backbone.LocalStorage = require("backbone.localstorage");

var MagicTourRequest = Backbone.Model.extend({
    defaults: {
        user_id:"f6f7d00b53428a390d04a63bd3d2f3e5f81b0f6e",
        arr_x:"5.385857",
        arr_y:"43.300642",
        etype_einflu:JSON.stringify({"5":"3","4":"3","1":"0","3":"4","2":"0","6":"0","7":"5","8":"1"}),
        dep_x:"5.385857",
        dep_y:"43.300642",
        language:"fr",
        option_date:"04/09/2015",
        option_heure:"450",
        option_temps:"120",
        option_days:"1",
        option_distance:"5000",
        option_with_child:"true"
    },

    timeSteps: [
        {value: 10, label: '10min'},
        {value: 15, label: '15min'},
        {value: 20, label: '20min'},
        {value: 25, label: '25min'},
        {value: 30, label: '30min'},
        {value: 40, label: '40min'},
        {value: 50, label: '50min'},
        {value: 60, label: '1h'},
        {value: 75, label: '1h15'},
        {value: 90, label: '1h30'},
        {value: 105, label: '1h45'},
        {value: 120, label: '2h'}
    ],

    url: 'http://dev.optitour.fr/magic/naturalsolution/magictour/',

    getDistanceKm: function() {
        return Math.round(this.get('option_distance') / 1000);
    }
});

module.exports = MagicTourRequest;