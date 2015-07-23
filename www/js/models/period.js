var Backbone = require('backbone'),
    $ = require('jquery');

Backbone.LocalStorage = require("backbone.localstorage");

Periode = Backbone.Model.extend({
    defaults: function() {
      return {
        poi_id: 0,
        interval: [1,1,1,1,1,1,1],
        open_hour: 0,
        close_hour: 0,
        open_date: 21/07/2015,
        close_date: 21/07/2015
                

      };
    },

    initialize: function () {

    },


});
PeriodeCollection = Backbone.Collection.extend({

    model: Periode,
	url: '',
	localStorage: new Backbone.LocalStorage("PeriodeCollection"),


});

Backbone.$ = $;

module.exports = {
    Periode: Periode,
    PeriodeCollection: PeriodeCollection
};