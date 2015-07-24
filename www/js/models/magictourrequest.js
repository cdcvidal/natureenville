'use strict';

var Backbone = require('backbone'),
    $ = require('jquery');

Backbone.LocalStorage = require("backbone.localstorage");

var MagicTourRequest = Backbone.Model.extend({
    defaults: function() {
        return {
            user_id:"f6f7d00b53428a390d04a63bd3d2f3e5f81b0f6e",
            arr_x:"5.437166",
            arr_y:"43.2291625",
            etype_einflu:JSON.stringify({"5":"3","4":"3","1":"2","3":"3","2":"0","6":"0"}),
            dep_x:"5.437166",
            dep_y:"43.2291625",
            language:"fr",
            option_date:"04/09/2015",
            option_heure:"0",
            option_temps:"120",
            option_days:"1",
            option_distance:"5000",
            option_with_child:"false"
      };
    },

    initialize: function () {

    },
    url: 'http://dev.optitour.fr/magic/naturalsolution/magictour/',

});
var MagicTourRequestCollection = Backbone.Collection.extend({

    model: MagicTourRequest,
	url: 'http://dev.optitour.fr/magic/naturalsolution/magictourrequest/',
	localStorage: new Backbone.LocalStorage("MagicTourRequestCollection")

});

Backbone.$ = $;

module.exports = {
    MagicTourRequest: MagicTourRequest,
    MagicTourRequestCollection: MagicTourRequestCollection
};