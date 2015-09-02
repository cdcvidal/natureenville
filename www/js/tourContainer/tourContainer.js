'use strict';

/*
 * Dependencies
 */
var BaseView = require('../baseview'),
    TourDetailsView = require('../tourDetails/tourDetails'),
    TourMapView = require('../tourMap/tourMap');

/*
 * Backbone view
 */
var TourContainerView = BaseView.extend({
    template: require('./tourContainer.html'),
    sectionClass: 'section-tour',

    events: {
        'click .nav-tabs li.tab-map': 'onClickMapTab',
        'click .nav-tabs li.tab-details': 'onClickDetailsTab'
    },

    initialize: function (options) {
        this.listenTo(this.model, 'request', this.showSpinner);
        this.listenTo(this.model, 'error', this.hideSpinner); // TODO: Display an error message for the user?
        this.listenTo(this.model, 'change', this.hideSpinner);

        var ViewClass = options.tab === 'map' ? TourMapView : TourDetailsView;
        this.tabView = new ViewClass(options);

        this.currentTab = options.tab;
        this.mode = options.mode;
        this.title = options.mode === 'loop' ? 'Boucle' : 'Itinéraire';

        BaseView.prototype.initialize.apply(this, arguments);
    },

    showSpinner: function () {
        // Show a spinner while loading
        this.$el.find('.loader').show();
    },

    hideSpinner: function () {
        // Hide spinner
        this.$el.find('.loader').hide();
    },

    beforeRender: function() {
        this.insertView('div.tab-content', this.tabView);
    },

    afterRender: function() {
        if (this.model.isPending) {
            this.showSpinner();
        }
    },

    serialize: function () {
        return {
            mode: this.mode,
            mapActive: this.currentTab === 'map' ? 'active' : '',
            detailsActive: this.currentTab === 'details' ? 'active' : ''
        };
    },

    onClickMapTab: function (e) {
        this.onClickTab(e, 'map');
    },

    onClickDetailsTab: function (e) {
        this.onClickTab(e, 'details');
    },

    onClickTab: function (e, tab) {
        if (this.currentTab === tab) {
            // Disable anchor behavior, we're already on the clicked tab
            e.preventDefault();
            return false;
        }
    }
});

module.exports = TourContainerView;
