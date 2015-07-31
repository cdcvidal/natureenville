'use strict';

var baseview = require('../baseview');
var $ = require('jquery');
var Swiper = require('swiper');

var fichePoiView = baseview.extend({
    template: require('./fichePoi.html'),
    initialize: function () {
        $('.burgerJs').hide();
        $('.navbar-brand').before("<a href='#boucleDetail' type='button' class='navbar-toggle arrowLeftJs'><span class='glyphicon glyphicon-menu-left'></span></a>");
        $('.navbar-brand').text(this.model.get('name_fr'));
    },
    serialize: function () {
        return {
            model: this.model
        };
    },
    afterRender: function(){
        this.swiper = new Swiper('.swiper-container', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: false,
            pagination: $('.swiper-pagination'),
            paginationClickable: true,
            paginationBulletRender: function (index, className) {
                return '<li class="'+ className +'"></li>';
            }
        });
    },
    remove: function() {
        $('.arrowLeftJs').remove();
        $('.burgerJs').show();
        $('.navbar-brand').text('Mon jardin en ville');
        baseview.prototype.remove.apply(this, arguments);
    }



});

module.exports = {
    action: function() {
    },

    view: fichePoiView
};
