var Backbone = require('backbone'),
    $ = require('jquery');

Backbone.LocalStorage = require("backbone.localstorage");

MagicTour = Backbone.Model.extend({
    defaults: function() {
        return {
            user_id: "", // result ws login
            arr_x:5.437166, //longitude pt arrivéee
            arr_y:43.2291625, //latitude pt arrivée
            etype_einflu:{5:3,4:3,1:2,3:2,2:0,6:0}, //podération des différents types
            dep_x:5.437166, //longitude pt départ
            dep_y:43.2291625, //latitude pt départ
            language:'fr',
            option_date:'21/07/2015',
            option_heure:540, //heure du départ en minute
            option_temps:120, //durée en minutes
            option_days:1, //nb de jour
            option_distance:5000,
            option_wild_child:true //avec ou sans enfant
      };
    },

    initialize: function () {

    },


});
MagicTourCollection = Backbone.Collection.extend({

    model: MagicTour,
	url: 'http://dev.optitour.fr/magic/naturalsolution/',
	localStorage: new Backbone.LocalStorage("MagicTourCollection")

});

Backbone.$ = $;

module.exports = {
    MagicTour: MagicTour,
    MagicTourCollection: MagicTourCollection
};