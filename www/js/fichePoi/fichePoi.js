'use strict';

var BaseView = require('../baseview');
var $ = require('jquery');
var _ = require('lodash');
var moment = require('moment');
//var Swiper = require('swiper');

var FichePoiView = BaseView.extend({
    template: require('./fichePoi.html'),
    initialize: function () {
        //moment.locale('fr');
    },
    serialize: function () {
        var self = this;
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
        BaseView.prototype.remove.apply(this, arguments);
    }
});

module.exports = FichePoiView;
