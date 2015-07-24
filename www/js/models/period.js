var Backbone = require('backbone'),
    $ = require('jquery');

Backbone.LocalStorage = require("backbone.localstorage");

Period = Backbone.Model.extend({
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

    getInfo: function () {
        return this.get("poi_id") + " [open: " + this.get("open_hour") + "]";
    }


});
PeriodCollection = Backbone.Collection.extend({

    model: Period,
	url: '',
	localStorage: new Backbone.LocalStorage("PeriodCollection"),


});

Backbone.$ = $;

module.exports = {
    Period: Period,
    PeriodCollection: PeriodCollection
};