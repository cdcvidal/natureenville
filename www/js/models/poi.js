var Backbone = require('backbone'),
    $ = require('jquery');

Backbone.LocalStorage = require("backbone.localstorage");

Poi = Backbone.Model.extend({
    defaults: function() {
        var self = this;
      return {
        externalId: 0,
        longitude: 0,
        latitude: 0,
        name:'',
        name_en:'',
        name_fr:'',
        name_es:'',
        name_de:'',
        name_it:'',
        visit_time_min: 0 ,
        visit_time_max: 0,
        price_min: '',
        price_max: '',
        type_id: '',
        street: '',
        postal_code:'',
        phone:'',
        mail:'',
        website:'',
        resa_link:'',
        url_img1:'',
        url_img2:'',
        desc:'',
        desc_en:'',
        desc_fr:'',
        desc_es:'',
        desc_de:'',
        desc_it:'',
        withchild: true,
        period:{    poi_id: self.get(externalId),
                    interval: [1,1,1,1,1,1,1],
                    open_hour: 0,
                    close_hour: 0,
                    open_date: 21/07/2015,
                    close_date: 21/07/2015
                }

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