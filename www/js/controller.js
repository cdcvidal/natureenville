'use strict';

var $ = require('jquery'),

    currentPos = require('./current-position'),
    poi = require('./models/poi'),
    user = require('./models/user'),
    badges = require('./models/badge').instanceColl,
    magicTour = require('./models/magictour'),

    HomeView = require('./home/home'),
    ProfileView = require('./profile/profile'),
    TourContainerView = require('./tourContainer/tourContainer'),
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
    var self = this;
    var poiCollection = require('./models/poi').instancePoiCollection;
    poiCollection.deferred.done(function(){
        var v = new ProfileView({
            model: user,
            collection: badges,
           options: poiCollection
        });
        self._displayView(v);
    });

};

Controller.prototype.tourContainerViewDisplay = function(mode, tab, poiId) {
    if (magicTour.isVirgin) {
        // Load a tour with default values if none exists
        if (currentPos.has('latitude')) {
            magicTour.request.set({
                dep_x: currentPos.get('longitude'),
                dep_y: currentPos.get('latitude')
            });
            magicTour.setMode(mode);
        } else {
            currentPos.once('change', function() {
                magicTour.request.set({
                    dep_x: currentPos.get('longitude'),
                    dep_y: currentPos.get('latitude')
                });
                magicTour.setMode(mode);
            });
        }
    } else {
        magicTour.setMode(mode);
    }

    var v = new TourContainerView({
        model: magicTour,
        mode: mode,
        tab: tab
    });
    this._displayView(v);

    if (poiId !== void 0) {
        this._currentView.tabView.zoomToPOI(poiId);
    }
};

Controller.prototype.ficheViewDisplay = function(poiId) {
    var currentStep = magicTour.attributes.stops.find(function(step) {
            return step.isPoi() && step.get('poi').id === poiId;
        }),
        v = new FichePoiView({
            model: currentStep
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
    // Keep a reference to the main ccurrent view
    if (this._currentView) {
        this._currentView.remove();
        this._currentView.off();
    }
    this._currentView = view;
    // Set section class on body
    if (view.sectionClass) {
        $('body').alterClass('section-*', view.sectionClass);
    }
    // Set title on container
    require('./container/container').setTitle(view.title || '');
    // Bind this view to the DOM
    $('#main').empty();
    $('#main').append(view.el);
    view.render();
};

module.exports = new Controller();