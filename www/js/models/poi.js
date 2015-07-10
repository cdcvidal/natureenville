var Backbone = require('backbone'),
    $ = require('jquery');

Backbone.LocalStorage = require("backbone.localstorage");

Poi = Backbone.Model.extend({
    defaults: function() {
      return {
        title: "empty todo...",
        order: Todos.nextOrder(),
        done: false
      };
    },

    initialize: function () {

    },


});
PoiCollection = Backbone.Collection.extend({

    model: Poi,
	url: '',
	localStorage: new Backbone.LocalStorage("PoiCollection")

});

Backbone.$ = $;

module.exports = {
    Poi: Poi,
    PoiCollection: PoiCollection
};