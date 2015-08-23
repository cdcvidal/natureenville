var Backbone = require('backbone'),
    $ = require('jquery');

var period = require('./period');

Backbone.LocalStorage = require("backbone.localstorage");

Poi = Backbone.Model.extend({
    defaults: function() {
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
        withchild: true ,
        period: {}

      };
    },

    initialize: function () {
        var Mperiod = new period.Period();
        this.set("period",Mperiod);
    },

    // Ensure that each poi created has name, longitude, latitude, type_id, street, postal_code.
    validate: function(attrs, options) {
        if (!attrs.name) {
          return "L'information name est manquante";
        }
        // if (!attrs.longitude) {
        //   return "L'information longitude est manquante";
        // }
        // if (!attrs.latitude) {
        //   return "L'information latitude est manquante";
        // }
        // if (!attrs.type_id) {
        //   return "L'information type du POI est manquante";
        // }
        // if (!attrs.street) {
        //   return "L'information rue est manquante";
        // }
        // if (!attrs.postal_code) {
        //   return "L'information code postal est manquante";
        // }
    }

});
PoiCollection = Backbone.Collection.extend({

    model: Poi,
	url: '',
	localStorage: new Backbone.LocalStorage("PoiCollection"),

});

var instance = new Poi();
var instancePoiCollection = new PoiCollection();

Backbone.$ = $;

module.exports = {
    instance: instance,
    instancePoiCollection: instancePoiCollection,
    Poi: Poi,
    PoiCollection: PoiCollection
};

/* example instantiation of model Poi
    var currentPoi = new poi.Poi({
        externalId: 0,
        longitude: 0,
        latitude: 0,
        name:'Pot de fleur',
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
        street: 'rue des pieds',
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
        withchild: true ,
        period: {}
    });
    currentPoi.get("period").set({
            poi_id: 9990,
            open_hour: 5,
            close_hour: 10,
    });
*/