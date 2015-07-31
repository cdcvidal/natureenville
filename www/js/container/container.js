'use strict';

var baseview = require('../baseview');
var $ = require('jquery'),
    Backbone = require('backbone'),
    _ = require('lodash');

Backbone.$ = $;

var ContainerView = baseview.extend({
        template: require('./page-container.html'),

        serialize: function () {
            return {
                msg: 'Container!'
            };
        },
         events:{
            'click [data-toggle=offcanvas]': 'toggleCanvas',
        },

        toggleCanvas: function(){
            $('.row-offcanvas').toggleClass('active');
        },
    });

var instance = new ContainerView();

module.exports = {
    instance: instance
};
