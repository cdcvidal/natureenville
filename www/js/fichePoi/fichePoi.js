'use strict';

var BaseView = require('../baseview'),
    _ = require('lodash'),
    moment = require('moment');

var FichePoiView = BaseView.extend({
    template: require('./fichePoi.html'),
    sectionClass: 'section-poi',
    title: 'Détail',

    events: {
        'click #see-on-map': 'seeOnMap'
    },

    seeOnMap: function() {
        var router = require('../router'),
            // Analyze magictour to detect whether it's a loop or not
            magictour = require('../models/magictour'),
            ol = require('planet-maps/dist/ol-base'),
            startStep = magictour.get('stops').first(),
            endStep = magictour.get('stops').last(),
            isLoop = ol.extent.equals(startStep.get('geom').getExtent(), endStep.get('geom').getExtent());
        // route user to the corresponding map
        router.navigate((isLoop ? 'loop' : 'direction') + '/map/' + this.model.id, {trigger: true});
    },

    serialize: function () {
        var openingDays = [];
        _.forEach(this.model.get('period').get('interval'), function(isOpen, index) {
            if ( isOpen )
                openingDays.push(_.capitalize(moment().day(index).format('ddd')));
        });
        return {
            title: this.model.get('name_fr'),
            general_type: this.model.get('general_type').toJSON(),
            image: this.model.get('url_img1'),
            creditPhoto: this.model.get('photo_credit_html'),
            open_hour: this.model.get('period').get('open_hour'),
            address: this.model.get('street'),
            desc: this.model.get('desc_html'),
            openingDays: openingDays.join(' ')
        };
    }
});

module.exports = FichePoiView;
