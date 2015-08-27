'use strict';

var $ = require('jquery'),
    BaseView = require('../baseview'),
    router = require('../router');


var ContainerView = BaseView.extend({
    template: require('./app-container.html'),

    serialize: function () {
        return {};
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

module.exports = new ContainerView();
