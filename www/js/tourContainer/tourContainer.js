'use strict';

/*
 * Dependencies
 */
var BaseView = require('../baseview'),
    $ = require('jquery'),
    BoucleDetailView = require('../boucleDetail/boucleDetail'),
    BoucleCarteView = require('../boucleCarte/boucleCarte');

/*
 * Backbone view
 */
var TourContainerView = BaseView.extend({
    template: require('./tourContainer.html'),
    sectionClass: 'section-loop',
    title: 'Boucle',

    events: {
        'click .nav-tabs li a': 'onClickTab'
    },

    initialize: function () {
        this.listenTo(this.model, 'request', this.showSpinner);
        this.listenTo(this.model, 'error', this.hideSpinner); // TODO: Display an error message for the user?
        this.listenTo(this.model, 'change', this.hideSpinner);

        var options = {
            model: this.model
        };
        this.detailView = new BoucleDetailView(options);
        this.mapView = new BoucleCarteView(options);

        BaseView.prototype.initialize.call(this, arguments);
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
        if (this.model.isEmpty) {
            this.showSpinner();
        }
    },

    serialize: function () {
        return {};
    },

    onClickTab: function (e) {
        // Update active tab
        this.$el.find('.nav-tabs li').removeClass('active');
        $(e.target).parent().addClass('active');

        // Actually show tab
        this.mapView.toggleTab();
        this.detailView.toggleTab();

        // Disable anchor behavior
        e.preventDefault();
        return false;
    }
});

module.exports = TourContainerView;
