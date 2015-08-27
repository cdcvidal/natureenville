'use strict';

var homeView = require('./home/home'),
    $ = require('jquery'),
    poi = require('./models/poi'),
    contributionView = require('./contribution/contribution');

/*
 * Controller class
 */

// Constructor
var Controller = function() {
    this._currentView =  null;
};

// "Action" methods
Controller.prototype.homeViewDisplay = function () {
    $('body').alterClass('section-*', 'section-home');
    var homeV = new homeView.view();
    this._displayView(homeV);
};

Controller.prototype.contributionViewDisplay = function () {
    $('body').alterClass('section-*', 'section-contribution');
    var poiM = new poi.Poi();
    var contributionV = new contributionView.view({
        model: poiM
    });
    this._displayView(contributionV);
};

// Helper method for switching main view
Controller.prototype._displayView = function(view) {
    if (this._currentView) {
        this._currentView.remove();
        this._currentView.off();
    }
    this._currentView = view;
    $('#main').empty();
    $('#main').append(view.el);
    view.render();
};

module.exports = new Controller();