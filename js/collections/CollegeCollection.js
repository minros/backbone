define([
    'backbone',
], function(Backbone){

    var CollegeCollection = Backbone.Collection.extend({

        url: function(){
            return "https://api.parse.com/1/classes/colleges";
        },

        initialize : function() {
            var self = this;
        },

    });

    return CollegeCollection;

});