'use strict';

var baseview = require('../baseview');
var $ = require('jquery'),
    Backbone = require('backbone'),
    _ = require('lodash'),
    bootstrap = require('bootstrap'),
    dialog = require('bootstrap-dialog')
;
Backbone.$ = $;

var poi = require('../models/poi').instance;
var typepoi = require('../models/typepoi').instance;
var poiCollection = require('../models/poi').instancePoiCollection;


var contributionView = baseview.extend({
    template: require('./contribution.html'),

    initialize: function(){
        this.listenTo(this.model, 'invalid', this.onModelInvalid);
        this.listenTo(this.model, 'change', this.onModelChange);
    },

    onModelInvalid: function(model, errors){
        console.log('onModelinvalidate',errors);
    },

    events: {
        'click .submit' : 'onSubmit',
        'click #take-picture': 'capturePhoto',
        'change #input-picture': 'loadPhoto'
    },

    onSubmit: function(e){
        e.preventDefault();
        var name = $("input[name*='name']", this.$el).val();
        var type_id = $("input[name*='type_id']", this.$el).val();
        var street = $("input[name*='street']", this.$el).val();
        var postal_code = $("input[name*='postal_code']", this.$el).val();
        var desc = $("input[name*='desc']", this.$el).val();
        var picture = this.getValue();

        this.model.set({
            'name':name,
            'type_id':type_id,
            'street':street,
            'postal_code':postal_code,
            'desc':desc,
            'url_img1': picture
        });

        poiCollection.add(this.model).save().done(function(){
            dialog.show({
                title: 'Merci pour votre contribution!',
            });
        });
    },

    onModelChange:function(){
        console.log('change', this.model.attributes);
    },

    getValue: function() {
        if (this.$el) {
            var val = this.$el.find('img').attr('src');
            if (val === this.nullValue || val === null || val === "") return undefined;
            if (!this.multiple) return [val];
            return val;
        }
    },
    loadPhoto: function() {
        var input = document.querySelector('input[type=file]');
        var file = readfile(input.files[0]);
        var self = this;

        function readfile(f) {
            var reader = new FileReader();
            reader.readAsDataURL(f);
            reader.onload = function() {
                var data = reader.result;
                self.$el.find('.img-preview img.editor-picture-img').attr('src', data);
            };
            reader.onerror = function(e) {
                console.log("Error", e);
            };
        }
    },
    capturePhoto: function() {
        var self = this;
        // Take picture using device camera and retrieve image as a local path
        navigator.camera.getPicture(
            _.bind(this.onSuccess, this),
            _.bind(this.onFail, this), {
                /* jshint ignore:start */
                    quality : 75,
                    destinationType : Camera.DestinationType.FILE_URI,
                    correctOrientation: true,
                    sourceType : Camera.PictureSourceType.CAMERA,
                /* jshint ignore:end */
            }
        );
    },

    onSuccess: function(imageURI) {
        if(window.cordova){
            var tagprojet = "monJardinEnville";
            var self = this;
            var fsFail = function(error) {
                console.log("failed with error code: " + error.code);
            };
            var copiedFile = function(fileEntry) {
                console.log(fileEntry.nativeURL);
                $('.editor-picture-img').attr('src', fileEntry.nativeURL);
            };
            var gotFileEntry = function(fileEntry) {
                console.log("got image file entry: " + fileEntry.nativeURL);
                var gotFileSystem = function(fileSystem) {
                    fileSystem.root.getDirectory(tagprojet, {
                        create: true,
                        exclusive: false
                    }, function(dossier) {
                        fileEntry.moveTo(dossier, (new Date()).getTime() + '_' + tagprojet + '.jpg', copiedFile, fsFail);
                    }, fsFail);
                };
                /* jshint ignore:start */
                window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFileSystem, fsFail);
                /* jshint ignore:end */
            };
            window.resolveLocalFileSystemURI(imageURI, gotFileEntry, fsFail);
        }
    },


    onFail: function(message) {
        this.$el.find('.img-preview').hide();
        this.$el.find('.img-error').show();
        this.$el.find('#img-error-msg').html(message);
        alert(message);
    },

    serialize: function() {
        return {
            model: this.model,
            collection: this.collection,
            typepoiinstance: typepoi
        };
    },
    afterRender: function() {

    },
});



module.exports = {
    view: contributionView
};