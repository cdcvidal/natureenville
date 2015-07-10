var Backbone = require('backbone'),
    $ = require('jquery');

Backbone.$ = $;
Backbone.LocalStorage = require("backbone.localstorage");

User = Backbone.Model.extend({
    defaults: function() {
      return {
        nickMame: 'Nickname',
        mail: '',
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


module.exports = {
    User: User,
    UserCollection: UserCollection
};