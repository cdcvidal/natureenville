'use strict';

var moment = require('moment');

module.exports = {
    formatMinutes: function(minutes) {
        return moment().startOf('day').add(parseFloat(minutes), 'minutes').format('h:m');
    }
};