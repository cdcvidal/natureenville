'use strict';

var moment = require('moment');

module.exports = {
    formatMinutes: function(minutes) {
        return moment().startOf('day').add(parseFloat(minutes), 'minutes').format('hh:mm');
    },
    checkConnection: function() {
        if (navigator.connection) {
            var networkState = navigator.connection.type;
            var states = {};
            var Connection;
            states[Connection.UNKNOWN] = 'Unknown connection';
            states[Connection.ETHERNET] = 'Ethernet connection';
            states[Connection.WIFI] = 'WiFi connection';
            states[Connection.CELL_2G] = 'Cell 2G connection';
            states[Connection.CELL_3G] = 'Cell 3G connection';
            states[Connection.CELL_4G] = 'Cell 4G connection';
            states[Connection.CELL] = 'Cell generic connection';
            states[Connection.NONE] = 'No network connection';
            return states[networkState];
        }
    }
};