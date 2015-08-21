'use strict';

var Backbone = require('backbone');

var GeneralTypePoi = Backbone.Model.extend({
    defaults: {
        id: null,
        name_fr: ''
    }
});

var generalTypes = new Backbone.Collection([
    {id: 1, name_fr: 'Avenue bordée'},
    {id: 2, name_fr: 'Arbre remarquable'},
    {id: 3, name_fr: 'Parc et jardin'},
    {id: 4, name_fr: 'Lieu insolite'},
    {id: 5, name_fr: 'Rue végétalisée'},
    {id: 6, name_fr: 'Plante sauvage'},
    {id: 7, name_fr: 'Jardin potager'},
    {id: 8, name_fr: 'aménagement paysager'}
], {
    model: GeneralTypePoi
});

module.exports = generalTypes;