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

    initialize: function() {
        var magictour = require('../models/magictour'),
            isLoop = magictour.get('isLoop');

        this.sectionClass += ' section-magictour-is-'+ (isLoop ? 'loop': 'direction');
    },

    seeOnMap: function() {
        var router = require('../router'),
            // Analyze magictour to detect whether it's a loop or not
            magictour = require('../models/magictour'),
            isLoop = magictour.get('isLoop');
            /*ol = require('planet-maps/dist/ol-base'),
            startStep = magictour.get('stops').first(),
            endStep = magictour.get('stops').last(),
            isLoop = ol.extent.equals(startStep.get('geom').getExtent(), endStep.get('geom').getExtent());*/
        // route user to the corresponding map
        router.navigate((isLoop ? 'loop' : 'direction') + '/map/' + this.model.get('poi').id, {trigger: true});
    },

    serialize: function () {
        var openingDays = [];
        var poi = this.model.get('poi');

        _.forEach(poi.get('period').get('interval'), function(isOpen, index) {
            if ( isOpen )
                openingDays.push(_.capitalize(moment().day(index).format('ddd')));
        });
        return {
            title: poi.get('name_fr'),
            general_type: poi.get('general_type').toJSON(),
            visitTime: this.model.get('visit_time'),
            image: poi.get('url_img1'),
            creditPhoto: poi.get('photo_credit_html'),
            open_hour: poi.get('period').get('open_hour'),
            address: poi.get('street'),
            desc: poi.get('desc_html'),
            openingDays: openingDays.join(' ')
        };
    }
});

module.exports = FichePoiView;
