'use strict';

var baseview = require('../baseview');
var $ = require('jquery'),
    Backbone = require('backbone'),
    _ = require('lodash');

var router = require('../router');


var ContainerView = baseview.extend({
        template: require('./app-container.html'),

        serialize: function () {
            return {
                msg: 'Container!'
            };
        },
        events: {
            'click [data-toggle=sidenav]': 'toggleSideNav',
            'click .sidenav': 'onSideNavClick',
            'click .header-js' : 'goToprofile',
            'click .btn-back' : 'historyBack'
        },

        toggleSideNav: function(){
            $('body').toggleClass('show-sidenav');
        },

        onSideNavClick: function(){
            $('body').removeClass('show-sidenav');
        },

        goToprofile: function(){
            router.navigate('#profile',{trigger: true});
        },
        historyBack: function(){
            window.history.back();
        }
    });

var instance = new ContainerView();

module.exports = {
    instance: instance
};
