var Backbone = require('backbone');

var User = Backbone.Model.extend({
    defaults: {
        nickMame: 'Nickname',
        mail: '',
        photo: '',
    }
});

module.exports = new User();