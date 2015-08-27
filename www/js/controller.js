'use strict';

var $ = require('jquery'),

    currentPos = require('./current-position'),
    poi = require('./models/poi'),
    user = require('./models/user'),
    badges = require('./models/badge').instanceColl,
    magicTour = require('./models/magictour'),

    HomeView = require('./home/home'),
    ProfileView = require('./profile/profile'),
    BoucleDetailView = require('./boucleDetail/boucleDetail'),
    BoucleCarteView = require('./boucleCarte/boucleCarte'),
    FichePoiView = require('./fichePoi/fichePoi'),
    ContributionView = require('./contribution/contribution');

/*
 * Controller class
 */

// Constructor
var Controller = function() {
    this._currentView =  null;
};

// "Action" methods
Controller.prototype.homeViewDisplay = function () {
    this._displayView(new HomeView());
};

Controller.prototype.profileViewDisplay = function() {
    var v = new ProfileView({
        model: user,
        collection: badges
    });
    this._displayView(v);
};

Controller.prototype.boucleDetailViewDisplay = function() {
    var v = new BoucleDetailView({
        model: magicTour
    });
    this._displayView(v);
};

Controller.prototype.boucleCarteViewDisplay = function() {
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

    var v = new BoucleCarteView({
        model: magicTour
    });
    this._displayView(v);
};

Controller.prototype.ficheViewDisplay = function(poiId) {
    var currentPOI = magicTour.attributes.stops.filter(function(item) {
        return item.poi_id == poiId;
    })[0];

    var poiM = new poi.Poi({
        'externalId': currentPOI.poi_id,
        'desc_fr': currentPOI.desc,
        'url_img1': currentPOI.image,
        'name_fr': currentPOI.place_name
    });
    var v = new FichePoiView({
        model: poiM
    });
    this._displayView(v);
};

Controller.prototype.contributionViewDisplay = function () {
    var poiM = new poi.Poi();
    var v = new ContributionView({
        model: poiM
    });
    this._displayView(v);
};

// Helper method for switching main view
Controller.prototype._displayView = function(view) {
    if (this._currentView) {
        this._currentView.remove();
        this._currentView.off();
    }
    if (view.sectionClass) {
        $('body').alterClass('section-*', view.sectionClass);
    }
    this._currentView = view;
    $('#main').empty();
    $('#main').append(view.el);
    view.render();
};

module.exports = new Controller();