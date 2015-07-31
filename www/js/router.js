'use strict';

var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('lodash');

var poi = require('./models/poi');
var magicTourInstance = require('./models/magictour').instance;


var homeView = require('./home/home'),
    profileView = require('./profile/profile'),
    boucleDetailView = require('./boucleDetail/boucleDetail'),
    boucleCarteView = require('./boucleCarte/boucleCarte'),
    fichePoiView = require('./fichePoi/fichePoi'),
    Router = Backbone.Router.extend({
        routes: {
            '': "homeViewDisplay",
            'profile': "profileViewDisplay",
            'boucleCarte': "boucleCarteViewDisplay",
            'boucleDetail': "boucleDetailViewDisplay",
            'fiche/:poiId': "ficheViewDisplay",
        },

        homeViewDisplay: function() {
            var homeV = new homeView.view();
            this.displayView(homeV);
        },

        profileViewDisplay: function() {
            var profileV = new profileView.view();
            this.displayView(profileV);
        },

        boucleDetailViewDisplay: function() {
            var boucleDetailV = new boucleDetailView.view({
                model: magicTourInstance
            });
            this.displayView(boucleDetailV);
        },
        boucleCarteViewDisplay: function() {
            var boucleCarteV = new boucleCarteView.view({
                model: magicTourInstance
            });
            this.displayView(boucleCarteV);
        },
        ficheViewDisplay: function(poiId) {
            var currentPOI = _.find(magicTourInstance.attributes.stops, function(item) {
                return item.poi_id == poiId;
            });

            var poiM = new poi.Poi();
            poiM.set({
            	'externalId': currentPOI.poi_id,
            	'desc_fr': currentPOI.desc,
            	'url_img1': currentPOI.image,
            	'name_fr': currentPOI.place_name
            });
            var ficheV = new fichePoiView.view({
                model: poiM
            });
            this.displayView(ficheV);
        },

        _currentView: null,

        displayView: function(view) {
            if (this._currentView) {
                this._currentView.remove();
                this._currentView.off();
            }
            this._currentView = view;
            $('#main').empty();
            $('#main').append(view.el);
            view.render();
        },
    });

module.exports = new Router();