var Backbone = require('backbone'),
    $ = Backbone.$,
    _ = require('lodash')
;
var poi = require('../models/poi').Poi;

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
},{
    calculAllRule: function(poiColl){
        this.calculPartageRule(poiColl);
        this.calculArrondissementRule(poiColl);
    },
    calculPartageRule: function(poiColl){
        var dfd = $.Deferred();
        var badgesInstanceColl = require('./badge').instanceColl;
        var lengthPoiColl = poiColl.length;
        var step = this.partageSteps.filter(function(ts) {
            return ts.value <= lengthPoiColl;
        });
        if (step.length) {
            //active badges for each matching rule
            _.forEach(step, function(n, key) {
                _.forEach(badgesInstanceColl.models, function(b, keyb) {
                    if(b.get('name') === n.label){
                        b.set({'activate':1}).save();
                    }
                });
            });
            dfd.resolve(step);
        } else {
            return dfd.resolve('');
        }
        return dfd.promise();
    },
    calculArrondissementRule: function(poiColl){
        var dfd = $.Deferred();
        var self = this;
        var badgesInstanceColl = require('./badge').instanceColl;
        _.forEach(poiColl.models, function(m, key) {
            var step = self.arrondissementSteps.filter(function(ts) {
                return ts.value === m.get('postal_code');
            });
            if (step.length) {
                //active badges for each matching rule
                _.forEach(step, function(n, key) {
                    _.forEach(badgesInstanceColl.models, function(b, keyb) {
                        if(b.get('name') === n.label){
                            b.set({'activate':1}).save();
                        }
                    });
                });
                dfd.resolve(step);
            } else {
                return dfd.resolve('');
            }
        });
        return dfd.promise();
    },
    partageSteps: [
        {value: 1, label: 'Première contribution'},
        {value: 1, label: 'Bienvenue'},
        {value: 5, label: '5 contributions'},
        {value: 15, label: '15 contributions'},
        {value: 30, label: '30 contributions'},
        {value: 50, label: '50 contributions'},
        {value: 80, label: '80 contributions'}
    ],
    arrondissementSteps: [
        {value: '13001', label: '1er arrondissement'},
        {value: '13002', label: '2e arrondissement'},
        {value: '13003', label: '3e arrondissement'},
        {value: '13004', label: '4e arrondissement'},
        {value: '13005', label: '5e arrondissement'},
        {value: '13006', label: '6e arrondissement'},
        {value: '13007', label: '7e arrondissement'},
        {value: '13008', label: '8e arrondissement'},
        {value: '13009', label: '9e arrondissement'},
        {value: '13010', label: '10e arrondissement'},
        {value: '13011', label: '11e arrondissement'},
        {value: '13012', label: '12e arrondissement'},
        {value: '13013', label: '13e arrondissement'},
        {value: '13014', label: '14e arrondissement'},
        {value: '13015', label: '15e arrondissement'},
        {value: '13016', label: '16e arrondissement'}
    ],
});


module.exports = {
    badge: Badge,
    instanceColl: new BadgeCollection(),
    BadgeCollection: BadgeCollection
};