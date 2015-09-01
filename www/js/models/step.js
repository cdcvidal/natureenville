var Backbone = require('backbone'),
    _ = require('lodash'),
    ol = require('planet-maps/dist/ol-base'),
    Poi = require('./poi').Poi;

var Step = Backbone.Model.extend({

    /*
     * Model describing a step within a MagicTour. It hold navigation data and
     * a reference to the visited POI.
     *
     * Attributes :
     * - date: date string formatted as dd/mm/yyyy
     * - arrival: ?
     * - departure: ?
     * - length_to_next_point: integer
     * - time_to_next_point: integer
     * - visit_time: integer
     * - geom: WKT geometry of this step (type POINT)
     * - poi: Poi model instance of the visited POI (undefined for departure and arrival steps)
     * - name_fr: either the name_fr of the poi or 'Départ' or 'Arrivée' (dynamic, use step.get('name_fr'))
     */

    parse: function(attrs, options) {

        // Parse direction information
        var wktParser = new ol.format.WKT(),
            data = _.pick(attrs, 'arrival', 'date', 'departure', 'length_to_next_point', 'time_to_next_point', 'visit_time', 'geom');
        data.length_to_next_point = parseInt(data.length_to_next_point);
        data.geom = wktParser.readGeometry(data.geom);
        data.time_to_next_point = parseInt(data.time_to_next_point);
        data.visit_time = parseInt(data.visit_time);

        // Parse attached POI
        if (parseInt(attrs.place_type) !== 0) {
            data.poi = new Poi(_.pick(attrs, 'adress', 'poi_id', 'desc', 'image', 'place_name', 'place_type', 'geom'), options);
        }

        return data;
    },

    get: function (attr) {
        if (attr in this.attributes) {
            return Backbone.Model.prototype.get.apply(this, arguments);
        } else if (attr === 'name_fr') {
            if (this.isPoi()) {
                return this.get('poi').get('name_fr');
            } else if (this.isDeparture()) {
                return 'Départ';
            } else if (this.isArrival()) {
                return 'Arrivée';
            }
        } else if ( attr === 'type' ) {
            return this.isPoi() ? 'poi' : ( this.isDeparture() ? 'departure' : 'arrival' );
        }
    },

    // Helper functions to tell whether this step is departure or arrival or a regular POI
    isPoi: function() {
        return this.get('poi') !== void 0;
    },

    isDeparture: function() {
        return (this.get('poi') === void 0) && (this.get('length_to_next_point') !== 0);
    },

    isArrival: function() {
        return (this.get('poi') === void 0) && (this.get('length_to_next_point') === 0);
    }
});

module.exports = Step;
