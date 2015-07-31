'use strict';

var Backbone = require('backbone'),
    $ = require('jquery');

Backbone.LocalStorage = require("backbone.localstorage");

var MagicTourRequest = Backbone.Model.extend({
    defaults: function() {
        return {
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