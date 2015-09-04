'use strict';

/*
 * Dependencies
 */
var BaseView = require('../baseview');

/*
 * Backbone view
 */
var PoiSummaryView = BaseView.extend({
    template: require('./poiSummary.html'),

    serialize: function () {
        return {
            id: this.model.id,
            name: this.model.get('name_fr'),
            desc: this.model.get('desc_html'),
            image: this.model.get('url_img1'),
            creditPhoto: this.model.get('photo_credit_html'),
            generalType: this.model.get('general_type').get('id')
        };
    }
});

module.exports = PoiSummaryView;
