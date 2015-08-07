var Backbone = require('backbone'),
    $ = require('jquery'),
    moment = require('moment')
    ;

Backbone.LocalStorage = require("backbone.localstorage");

Period = Backbone.Model.extend({
    defaults: function() {
      return {
        poi_id: 0,
        interval: [1,1,1,1,1,1,1],
        open_hour: 0,
        close_hour: 0,
        open_date:  moment().format("DD/MM/YYYY"),
        close_date:  moment().format("DD/MM/YYYY")
                

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