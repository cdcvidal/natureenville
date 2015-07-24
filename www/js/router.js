'use strict';

var Backbone = require('backbone');
var $ = require('jquery');


var homeView = require('./home/home'),
	profileView = require('./profile/profile'),
	boucleDetailView = require('./boucleDetail/boucleDetail'),
	boucleCarteView = require('./boucleCarte/boucleCarte'),
    Router = Backbone.Router.extend({
        routes: {
            '': "homeViewDisplay",
            'profile': "profileViewDisplay",
            'boucleCarte': "boucleCarteViewDisplay",
            'boucleDetail': "boucleDetailViewDisplay",
        },

		homeViewDisplay: function(){
			var homeV = new homeView.view();
			this.displayView(homeV);
		},

        profileViewDisplay : function(){
			var profileV = new profileView.view();
			this.displayView(profileV);
        },

        boucleDetailViewDisplay : function(){
			var boucleDetailV = new boucleDetailView.view({model: window.magicTour});
			this.displayView(boucleDetailV);
        },
        boucleCarteViewDisplay : function(){
			var boucleCarteV = new boucleCarteView.view({model: window.magicTour});
			this.displayView(boucleCarteV);
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