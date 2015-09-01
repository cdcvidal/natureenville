'use strict';

var BaseView = require('../baseview'),
    _ = require('lodash'),
    moment = require('moment');

var FichePoiView = BaseView.extend({
    template: require('./fichePoi.html'),
    sectionClass: 'section-poi',
    title: 'Détail',

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
            open_hour: this.model.get('period').get('open_hour'),
            address: this.model.get('street'),
            desc: this.model.get('desc_fr'),
            openingDays: openingDays.join(' ')
        };
    }
});

module.exports = FichePoiView;
