var Backbone = require('backbone'),
    moment = require('moment')
    ;

var Period = Backbone.Model.extend({
    defaults: {
        poi_id: 0,
        interval: [1,1,1,1,1,1,1],
        open_hour: 0,
        close_hour: 0,
        open_date:  moment().format("DD/MM/YYYY"),
        close_date:  moment().format("DD/MM/YYYY")
    },

    getInfo: function () {
        return this.get("poi_id") + " [open: " + this.get("open_hour") + "]";
    }
});

module.exports = Period;