'use strict';

var BaseView = require('../baseview');
var poi = require('../models/poi').Poi;
var BadgeCollection = require('../models/badge').BadgeCollection;

var ProfileView = BaseView.extend({
    template: require('./profile.html'),
    sectionClass: 'section-loop section-profile',
    title: 'Profil',

    initialize: function(param){
		this.contribution = param.options;
    },

    serialize: function () {
        return {
            model: this.model,
            collection: this.collection,
            nbContribution: this.contribution.length
        };
    },
    beforeRender: function(){
        BadgeCollection.calculAllRule(this.contribution);
    }
});

module.exports = ProfileView;
