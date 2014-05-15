define([
    'jquery',
    'underscore',
    'backbone',
    'baseview',
    'collectionview',
    'views/CollegeView',
    'collections/CollegeCollection',
    'text!templates/collegeListView.html'
], function($, _, Backbone, BaseView, CollectionView, CollegeView, CollegeCollection, collegeListViewTemplate){

    var CollegeListView = BaseView.extend({
        parent: null,
        el: function() {
            return $(collegeListViewTemplate);
        },

        initialize: function(){

            var self = this;

            _.bindAll(this, 'render');

            //this.$el.html(collegeListViewTemplate);

            this.collegeCollection = new CollegeCollection;


            //this.$el.html(collegeListViewTemplate);
//            var collectionView = new CollectionView({
//                collection: this.collegeCollection,
//                view: CollegeView,
//                el: this.$el.html('#college-list')
//
//            });


            //this.collegeCollection.bind("reset", this.render);
            this.collegeCollection.fetch();
        },

        render: function(){
            var self = this;


//            _.each(this.collegeCollection.models, function(collegeModel){
//                //console.log(collegeModel);
//                var view = new CollegeView({model: collegeModel});
//
//                this.$('#college-list').append(view.render().el);
//            });

        }

    });

    return CollegeListView;

});
