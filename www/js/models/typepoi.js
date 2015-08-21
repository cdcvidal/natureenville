'use strict';

var Backbone = require('backbone');

var TypePoi = Backbone.Model.extend({
    defaults: {
        id: null,
        name_fr: '',
        general_type_id: null,
        type_id: null
    }
});

var types = new Backbone.Collection([
    {id: 'park_garden', name_fr: 'parc et jardin', general_type_id: 3, type_id: 1},
    {id: 'botanical_garden', name_fr: 'jardin botanique', general_type_id: 3, type_id: 2},
    {id: 'remarkable_tree', name_fr: 'arbre remarquable', general_type_id: 2, type_id: 3},
    {id: 'shared_garden', name_fr: 'jardin partagé', general_type_id: 7, type_id: 4},
    {id: 'pocket_garden', name_fr: 'jardin de poche', general_type_id: 7, type_id: 5},
    {id: 'revegetated_street', name_fr: 'rue végétalisée', general_type_id: 5, type_id: 6},
    {id: 'avenue_tree', name_fr: 'avenue arborée', general_type_id: 1, type_id: 7},
    {id: 'landscaping', name_fr: 'aménagement paysager', general_type_id: 8, type_id: 8},
    {id: 'wild_plant', name_fr: 'plante sauvage', general_type_id: 6, type_id: 9},
    {id: 'strange_place', name_fr: 'lieu insolite', general_type_id: 4, type_id: 10},
    {id: 'natural_site', name_fr: 'site naturel', general_type_id: 3, type_id: 11},
    {id: 'exotic_garden', name_fr: 'jardin exotique', general_type_id: 3, type_id: 12},
    {id: 'rose_garden', name_fr: 'roseraie', general_type_id: 3, type_id: 13}
], {
    model: TypePoi
});

module.exports = types;