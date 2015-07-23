'use strict';

var Backbone = require('backbone');
var $ = require('jquery');


var homeView = require('./home/home'),
	profileView = require('./profile/profile'),
    Router = Backbone.Router.extend({
        routes: {
            '': "homeViewDisplay",
            'profile': "profileViewDisplay",
        },

		homeViewDisplay: function(){
			var homeV = new homeView.view();
			this.displayView(homeV);
		},

        profileViewDisplay : function(){
			var profileV = new profileView.view();
			this.displayView(profileV);
        },


          _currentView: null,

		displayView: function (view) {
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