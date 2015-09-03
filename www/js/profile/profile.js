'use strict';

var BaseView = require('../baseview');
var poi = require('../models/poi').Poi;
var BadgeCollection = require('../models/badge').BadgeCollection;

var ProfileView = BaseView.extend({
    template: require('./profile.html'),
    sectionClass: 'section-loop section-profile',

    initialize: function(param){
		this.contribution = param.options;
    },

    serialize: function () {
        return {
            model: this.model,
            collection: this.collection,
            //TODO remove if using poi methods
            //contribution: this.contribution
        };
    },
    beforeRender: function(){
        BadgeCollection.calculAllRule(this.contribution);
    }
});

module.exports = ProfileView;
