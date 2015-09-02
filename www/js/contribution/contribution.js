'use strict';

var BaseView = require('../baseview');
var Backbone = require('backbone'),
    $ = require('jquery'),
    _ = require('lodash'),
    bootstrap = require('bootstrap'),
    Dialog = require('bootstrap-dialog'),
    geocomplete = require('geocomplete'),
    utilities = require('../utilities')
;

var poi = require('../models/poi').instance;
var typepoi = require('../models/typepoi');
var poiCollection = require('../models/poi').instancePoiCollection;


var ContributionView = BaseView.extend({
    template: require('./contribution.html'),
    sectionClass: 'section-contribution',
    title: 'Ajouter un lieu',

    initialize: function(){
        BaseView.prototype.initialize.apply(this, arguments);
    },

    events: {
        'click .submit' : 'onSubmit',
        'click #take-picture': 'capturePhoto',
        'change #input-picture': 'loadPhoto',
        'focusin .has-error input': 'clearError',
        'click .cancel-js': 'historyBack'
    },
    historyBack: function(){
        window.history.back();
    },
    clearError: function(e){
        var $currentinput = e.currentTarget.parentElement;
        $($currentinput).removeClass('has-error');
    },

    onSubmit: function(e){
        e.preventDefault();
        var name = this.$el.find("input[name*='name']").val();
        var type_id = $("#type_id option:selected").text().trim();
        var street = this.$el.find("input[name*='route']").val();
        var postal_code = this.$el.find("input[name*='postal_code']").val();
        var latitude =  this.$el.find("input[name*='lat']").val();
        var longitude = this.$el.find("input[name*='lng']").val();
        var desc = this.$el.find("input[name*='desc']").val();
        var picture = this.getValue();
        var visit_time_min = $("#visit_time_min option:selected").text().trim();
        var visit_time_max = $("#visit_time_max option:selected").text().trim();
        var price_max = $("#price_max option:selected").text().trim();
        var price_min = $("#price_min option:selected").text().trim();
        var withchild = $("#with_child").is(":checked");


        this.model.set({
            'name':name,
            'type_id':type_id,
            'street':street,
            'postal_code':postal_code,
            'latitude': latitude,
            'longitude': longitude,
            'desc':desc,
            'url_img1': picture,
            'visit_time_min': visit_time_min,
            'visit_time_max': visit_time_max,
            'price_min': price_min,
            'price_max': price_max,
            'withchild': withchild
        });

        poiCollection.add(this.model).save({
            error: function(){ console.log('save error');},
            success: function(){ console.log('save success');}
        });
        if (this.model.isValid()) {
            Dialog.show({
                    title: 'Merci pour votre contribution!',
                    message:'Votre contribution sera ajoutée après validation par nos équipes.',
                    onhidden: function(){
                        this.historyBack();
                    },
                    type: 'type-success',
                    size: 'size-large'
                });
        }else{
            var msg= "";
            _.forEach(this.model.validationError,function(n,key){
                msg += n+"<br>";
                $("#"+key).parent().addClass("has-error");
            });
            Dialog.show({
                title: 'Champ(s) obligatoire(s)',
                message: msg,
                type: 'type-danger',
                size: 'size-large'
            });
        }

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
        var connect = utilities.checkConnection();
        if ((connect !== 'Unknown connection' && connect !== 'No network connection' && typeof connect!== "undefined") || (navigator.onLine) ){
            $("#geoloc").geocomplete({
                details: ".geoloc"
            })
                .bind("geocode:result", function(event, result) {
                })
                .bind("geocode:error", function(event, status) {
                    console.log("ERROR: " + status);
                });
        }else{
            $(".adresse-online-js").addClass("hidden");
            $(".adresse-offline-js").removeClass("hidden");
        }
    },
});



module.exports = ContributionView;