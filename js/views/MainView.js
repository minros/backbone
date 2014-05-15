define([
    'jquery',
    'underscore',
    'backbone',
    'baseview',
    'collectionview',
    'views/CollegeView',
    'views/CollegeListView',
    'collections/CollegeCollection',
    'text!templates/mainTemplate.html'
], function($, _, Backbone, BaseView, CollectionView, CollegeView, CollegeListView, CollegeCollection, mainTemplate){

    var MainView = BaseView.extend({
        el: function() {
            return $(mainTemplate);
        },
        initialize: function() {
            var self = this;
            this.CollegeView = CollegeView;
            this.CollegeListView = CollegeListView;
            this.CollegeCollection = CollegeCollection;
        }

    });

    return MainView;

});
