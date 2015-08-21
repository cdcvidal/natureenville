var Backbone = require('backbone');

Backbone.LocalStorage = require("backbone.localstorage");

var Badge = Backbone.Model.extend({
    defaults: {
        name: '',
        activate: 0,
        imageUrl: '',
        type:'',
        description:''
    }
});

var BadgeCollection = Backbone.Collection.extend({
    model: Badge,
    url: './data/badges.json',
    localStorage: new Backbone.LocalStorage("BadgeCollection"),

    parse: function(response) {
        return response;
    }
});

module.exports = {
    instanceColl: new BadgeCollection(),
    BadgeCollection: BadgeCollection
};