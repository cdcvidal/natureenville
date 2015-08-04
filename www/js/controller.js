'use strict';

var $ = require('jquery');

var homeView = require('./home/home');

var Controller = function(){
    var self = this;
	self.homeViewDisplay = function () {
            $('body').alterClass('section-*', 'section-home');
            var homeV = new homeView.view();
            self.displayView(homeV);
    };


    self._currentView =  null;

    self.displayView = function(view) {
        if (self._currentView) {
            self._currentView.remove();
            self._currentView.off();
        }
        self._currentView = view;
        $('#main').empty();
        $('#main').append(view.el);
        view.render();
    };

};

var controller = new Controller();

module.exports = controller;