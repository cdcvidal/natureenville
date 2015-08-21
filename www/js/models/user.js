var Backbone = require('backbone');

Backbone.LocalStorage = require("backbone.localstorage");

User = Backbone.Model.extend({
    defaults: function() {
      return {
        nickMame: 'Nickname',
        mail: '',
        photo: '',
      };
    },

    initialize: function () {

    },


});
UserCollection = Backbone.Collection.extend({

    model: User,
	url: '',
	localStorage: new Backbone.LocalStorage("UserCollection")

});

var instance = new User();

module.exports = {
    instance: instance,
    User: User,
    UserCollection: UserCollection
};