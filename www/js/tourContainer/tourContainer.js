'use strict';

/*
 * Dependencies
 */
var BaseView = require('../baseview'),
    BoucleDetailView = require('../boucleDetail/boucleDetail'),
    BoucleCarteView = require('../boucleCarte/boucleCarte');

/*
 * Backbone view
 */
var TourContainerView = BaseView.extend({
    template: require('./tourContainer.html'),
    sectionClass: 'section-loop',
    title: 'Boucle',

    currentTab: 'map',

    events: {
        'click .nav-tabs li.tab-map': 'onClickMapTab',
        'click .nav-tabs li.tab-details': 'onClickDetailsTab'
    },

    initialize: function (options) {
        this.listenTo(this.model, 'request', this.showSpinner);
        this.listenTo(this.model, 'error', this.hideSpinner); // TODO: Display an error message for the user?
        this.listenTo(this.model, 'change', this.hideSpinner);

        this.detailView = new BoucleDetailView(options);
        this.mapView = new BoucleCarteView(options);

        this.currentTab = options.tab;
        this.mode = options.mode;

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
        this.insertView('div.tab-content', this.mapView);
        this.insertView('div.tab-content', this.detailView);
    },

    afterRender: function() {
        if (this.model.isEmpty && this.mode === 'loop') {
            this.showSpinner();
        }
        this.showTab(this.currentTab);
        this.setMode(this.mode);
    },

    serialize: function () {
        return {
            mapActive: this.currentTab === 'map' ? 'active' : '',
            detailsActive: this.currentTab === 'details' ? 'active' : ''
        };
    },

    setMode: function (mode) {
        // Keep track of current mode
        this.mode = mode;
        // Update title
        require('../container/container').setTitle(this.mode === 'loop' ? 'Boucle' : 'Itinéraire');
        // Relay to map view
        this.mapView.setMode(mode);
    },

    showTab: function (tab) {
        // Update active tab
        this.$el.find('.nav-tabs li').removeClass('active');
        this.$el.find('.nav-tabs li.tab-' + tab).addClass('active');

        // Keep track of current tab
        this.currentTab = tab;

        // Update URL
        var router = require('../router');
        router.navigate(this.mode + '/' + tab); // Without trigger option, just update URL and navigation history

        // Actually show tab content
        this.mapView.switchTabContent(tab === 'map');
        this.detailView.switchTabContent(tab === 'details');
    },

    onClickMapTab: function (e) {
        this.onClickTab(e, 'map');
    },

    onClickDetailsTab: function (e) {
        this.onClickTab(e, 'details');
    },

    onClickTab: function (e, tab) {
        if (this.currentTab !== tab) {
            this.showTab(tab);
        }
        // Disable anchor behavior
        e.preventDefault();
        return false;
    }
});

module.exports = TourContainerView;
