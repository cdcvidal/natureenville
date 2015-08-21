'use strict';

var Backbone = require('backbone');

var TypePoi = Backbone.Model.extend({
    defaults: function() {
        return {
            park_garden:{'name_fr':'parc et jardin','general_type_id': 3,'type_id':1},
            botanical_garden:{'name_fr':'jardin botanique','general_type_id': 3,'type_id':2},
            remarkable_tree:{'name_fr':'arbre remarquable','general_type_id': 2,'type_id':3},
            shared_garden:{'name_fr':'jardin partagé','general_type_id': 7,'type_id':4},
            pocket_garden:{'name_fr':'jardin de poche','general_type_id': 7,'type_id':5},
            revegetated_street:{'name_fr':'rue végétalisée','general_type_id': 5,'type_id':6},
            avenue_tree:{'name_fr':'avenue arborée','general_type_id': 1,'type_id':7},
            landscaping:{'name_fr':'aménagement paysager','general_type_id': 8,'type_id':8},
            wild_plant:{'name_fr':'plante sauvage','general_type_id': 6,'type_id':9},
            strange_place:{'name_fr':'lieu insolite','general_type_id': 4,'type_id':10},
            natural_site:{'name_fr':'site naturel','general_type_id': 3,'type_id':11},
            exotic_garden:{'name_fr':'jardin exotique','general_type_id': 3,'type_id':12},
            rose_garden:{'name_fr':'roseraie','general_type_id': 3,'type_id':13}
        };
    },

    initialize: function () {

    },

});
var TypePoiCollection = Backbone.Collection.extend({

    model: TypePoi,

});

var instance = new TypePoi();

module.exports = {
    instance:instance,
    TypePoi: TypePoi,
    TypePoiCollection: TypePoiCollection
};