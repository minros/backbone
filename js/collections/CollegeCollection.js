define([
    'parse',
    'backbone',
    'models/CollegeModel'
], function(_, Backbone, CollegeModel){

    var CollegeCollection = Parse.Collection.extend({

        model: CollegeModel,

        initialize : function() {
            var self = this;
            this.query = new Parse.Query(CollegeModel);
        },

    });

    return CollegeCollection;

});