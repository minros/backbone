define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/collegeTemplate.html'
], function($, _, Backbone, collegeViewTemplate){

    var CollegeView = Backbone.View.extend({
        tagName:  "li",
        template: _.template(collegeViewTemplate),

        events: {
            "click .showresourcebutton":     "showCollegeResourcesOnMap"
        },

        initialize: function() {

            _.bindAll(this, 'render', 'showCollegeResourcesOnMap');

            this.collegeResourceLocations = [];

            // Create our collection of colleges starts off empty
            //this.collegeResources = new collegeResourceList;

            // Setup the query for the collection to look for college resources
            //this.collegeResources.query = new Parse.Query(collegeResource).equalTo("college", this.model);
        },
        // Re-render the contents of the college item.
        render: function() {
            $(this.el).html(this.template(this.model.toJSON()));
            return this;
        },
        // Show the college item on map.
        showCollegeResourcesOnMap: function() {
            // Fetch all the college resource items for this college
            this.collegeResources.fetch().then(
                function success(result) {
                    var resourceview = new collegeResourceListView({model: result.models});
                },
                function error(e) {
                    alert(e);
                }
            );
        }

    });

    return CollegeView;

});
