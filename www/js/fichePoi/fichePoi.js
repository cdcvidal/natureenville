'use strict';

var baseview = require('../baseview');
var $ = require('jquery');
var _ = require('lodash');
var moment = require('moment');
//var Swiper = require('swiper');

var fichePoiView = baseview.extend({
    template: require('./fichePoi.html'),
    initialize: function () {
        //moment.locale('fr');
        /*$('.burgerJs').hide();
        $('.navbar-brand').before("<a href='#boucleDetail' type='button' class='navbar-toggle arrowLeftJs'><span class='glyphicon glyphicon-menu-left'></span></a>");
        $('.navbar-brand').text(this.model.get('name_fr'));*/
    },
    serialize: function () {
        var self = this;
        console.log(self.model.get('period').get('interval'));
        var openingDays = [];
        _.forEach(self.model.get('period').get('interval'), function(isOpen, index) {
            if ( isOpen )
                openingDays.push(_.capitalize(moment().day(index).format('ddd')));
        });
        //console.log(_.isArray(openingDays.split));
        return {
            model: self.model,
            openingDays: openingDays.join(' ')
        };
    },
    afterRender: function(){
        /*this.swiper = new Swiper('.swiper-container', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: false,
            pagination: $('.swiper-pagination'),
            paginationClickable: true,
            paginationBulletRender: function (index, className) {
                return '<li class="'+ className +'"></li>';
            }
        });*/
    },
    remove: function() {
        /*$('.arrowLeftJs').remove();
        $('.burgerJs').show();
        $('.navbar-brand').text('Mon jardin en ville');*/
        baseview.prototype.remove.apply(this, arguments);
    }



});

module.exports = {
    action: function() {
    },

    view: fichePoiView
};
