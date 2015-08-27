'use strict';

var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('lodash'),
    currentPos = require('./current-position');

var poi = require('./models/poi');
var magicTour = require('./models/magictour');
var user = require('./models/user');
var controller = require('./controller');


var badgesInstanceColl = require('./models/badge').instanceColl;


var ProfileView = require('./profile/profile'),
    BoucleDetailView = require('./boucleDetail/boucleDetail'),
    BoucleCarteView = require('./boucleCarte/boucleCarte'),
    FichePoiView = require('./fichePoi/fichePoi'),
    Router = Backbone.Router.extend({
        routes: {
            '': "homeViewDisplay",
            'profile': "profileViewDisplay",
            'loop/map': "boucleCarteViewDisplay",
            'loop/details': "boucleDetailViewDisplay",
            'fiche/:poiId': "ficheViewDisplay",
            'contribution': 'contributionViewDisplay'
        },

        homeViewDisplay: function() {
            controller.homeViewDisplay();
        },

        contributionViewDisplay: function() {
            controller.contributionViewDisplay();
        },

        profileViewDisplay: function() {
            $('body').alterClass('section-*', 'section-loop section-profile');
            var profileV = new ProfileView({
                    model: user,
                    collection: badgesInstanceColl
                });
            this.displayView(profileV);
        },

        boucleDetailViewDisplay: function() {
            $('body').alterClass('section-*', 'section-loop section-loop-details');
            var boucleDetailV = new BoucleDetailView({
                model: magicTour
            });
            this.displayView(boucleDetailV);
        },
        boucleCarteViewDisplay: function() {
            $('body').alterClass('section-*', 'section-loop section-loop-map');

            // Load a tour with default values
            currentPos.promise().done(function() {
                var lat = currentPos.get('latitude'),
                    lon = currentPos.get('longitude');
                magicTour.request.set({
                    dep_x: lon,
                    dep_y: lat,
                    arr_x: lon,
                    arr_y: lat
                });
                magicTour.fetch();
            });

            var boucleCarteV = new BoucleCarteView({
                model: magicTour
            });
            this.displayView(boucleCarteV);
        },
        ficheViewDisplay: function(poiId) {
            $('body').alterClass('section-*', 'section-poi');
            var currentPOI = _.find(magicTour.attributes.stops, function(item) {
                return item.poi_id == poiId;
            });

            var poiM = new poi.Poi();
            poiM.set({
            	'externalId': currentPOI.poi_id,
            	'desc_fr': currentPOI.desc,
            	'url_img1': currentPOI.image,
            	'name_fr': currentPOI.place_name
            });
            var ficheV = new FichePoiView({
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

var router = new Router();

module.exports = router;