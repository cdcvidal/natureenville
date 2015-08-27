'use strict';

var BaseView = require('../baseview');
var Backbone = require('backbone'),
    $ = require('jquery'),
    _ = require('lodash'),
    bootstrap = require('bootstrap'),
    Dialog = require('bootstrap-dialog'),
    geocomplete = require('geocomplete')
;

var poi = require('../models/poi').instance;
var typepoi = require('../models/typepoi');
var poiCollection = require('../models/poi').instancePoiCollection;


var ContributionView = BaseView.extend({
    template: require('./contribution.html'),

    initialize: function(){
        this.listenTo(this.model, 'invalid', this.onModelInvalid);
        BaseView.prototype.initialize.call(this, arguments);
    },

    onModelInvalid: function(model, errors){
        var dfd = $.Deferred();
        console.log('onModelinvalidate',errors);
        if(errors){
            return dfd.reject(errors);
        }else{
            return dfd.resolve();
        }
    },

    events: {
        'click .submit' : 'onSubmit',
        'click #take-picture': 'capturePhoto',
        'change #input-picture': 'loadPhoto'
    },

    onSubmit: function(e){
        e.preventDefault();
        var name = this.$el.find("input[name*='name']").val();
        var type_id = this.$el.find("input[name*='type_id']").val();
        var street = this.$el.find("input[name*='street']").val();
        var postal_code = this.$el.find("input[name*='postal_code']").val();
        var desc = this.$el.find("input[name*='desc']").val();
        var picture = this.getValue();

        this.model.set({
            'name':name,
            'type_id':type_id,
            'street':street,
            'postal_code':postal_code,
            'desc':desc,
            'url_img1': picture
        });

        //TODO message
        poiCollection.add(this.model).save()
            .done(function(){
                Dialog.show({
                    title: 'Merci pour votre contribution!',
                });
            })
            .fail(function(error){
                Dialog.show({
                    title: error,
            });
        })
        ;
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
                this.$el.find('.editor-picture-img').attr('src', fileEntry.nativeURL);
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
    //TODO method checkconnection
    afterRender: function() {
        //var connect = checkConnection();
        //if (connect !== 'inconnu' || connect !== "none" || connect === true || connect !== undefined) {
            var self = this;
            $('#geoloc', this.el).geocomplete({
                    country: "FR"
                })
                .bind("geocode:result", function(event, result) {})
                .bind("geocode:error", function(event, status) {
                    console.log("ERROR: " + status);
                });
        //}
    },
});



module.exports = ContributionView;