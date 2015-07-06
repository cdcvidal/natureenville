'use strict';

var Backbone = require('backbone');

var homeAction = require('./home/home').action,
    Router = Backbone.Router.extend({
        routes: {
            '': homeAction
        }
    });

module.exports = new Router();