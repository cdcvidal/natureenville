var Backbone = require('backbone'),
    poiTypes = require('./typepoi'),
    ol = require('planet-maps/dist/ol-base'),
    Period = require('./period');

Backbone.LocalStorage = require("backbone.localstorage");

var Poi = Backbone.Model.extend({
    defaults: {
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
        // general_type_id => dynamic, read it with poi.get('general_type_id')
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
        period: new Period()
    },

    get: function (attr) {
        if (attr in this.attributes) {
            return Backbone.Model.prototype.get.apply(this, arguments);
        } else if (attr === 'general_type_id') {
            var tid = this.get('type_id'),
                type = poiTypes.find(function(t) {
                    return t.get('type_id') === tid;
                });
            if (type) {
                return type.get('general_type_id');
            }
        }
    },

    parse: function (attrs, options) {
        var wktParser = new ol.format.WKT(),
            geom = wktParser.readGeometry(attrs.geom),
            coords = geom.getCoordinates();
        return {
            street: attrs.adress,
            id: parseInt(attrs.poi_id),
            desc_fr: attrs.desc,
            url_img1: attrs.image,
            name_fr: attrs.place_name,
            type_id: parseInt(attrs.place_type),
            longitude: coords[0],
            latitude: coords[1]
        };
    },

    // Ensure that each poi created has name, longitude, latitude, type_id, street, postal_code.
    validate: function(attrs, options) {
        var errors = {};
        if (!attrs.name) {
            errors.name = "L'information nom est obligatoire.";
         // return "L'information nom est obligatoire.";
        }
        if (!attrs.longitude) {
         // return "L'information adresse est obligatoire.";
            errors.geoloc = "L'information adresse est obligatoire.";
        }
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
        if(!jQuery.isEmptyObject(errors))return errors;
    }

});

var PoiCollection = Backbone.Collection.extend({
    model: Poi,
    url: '',
    localStorage: new Backbone.LocalStorage("PoiCollection"),
});

module.exports = {
    instance: new Poi(),
    instancePoiCollection: new PoiCollection(),
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