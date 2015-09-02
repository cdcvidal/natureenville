var Backbone = require('backbone');

var User = Backbone.Model.extend({
    defaults: {
        nickMame: 'Jean Dupont',
        mail: 'jeandupont@nomdedomaine.fr',
        photo: '',
    }
});

module.exports = new User();