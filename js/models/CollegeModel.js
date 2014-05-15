define([
    'underscore',
    'backbone',
    'parse'
], function(_, Backbone, Parse) {

    var CollegeModel = Parse.Object.extend("colleges");

    return CollegeModel;

});