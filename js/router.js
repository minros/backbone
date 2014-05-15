// Filename: router.js
define([
  'jquery',
  'underscore',
  'backbone',
  'views/MainView'
], function($, _, Backbone, MainView) {
  
  var AppRouter = Backbone.Router.extend({
    routes: {
      // Define some URL routes
      'collegeResource/:collegeid': 'showCollegeResource',
      'users': 'showContributors',
      
      // Default
      '*actions': 'defaultAction'
    }
  });
  
  var initialize = function(){

    var app_router = new AppRouter;
    
    app_router.on('route:showCollegeResource', function(collegeid){
   
        // Call render on the module we loaded in via the dependency array


    });

    app_router.on('route:defaultAction', function (actions) {
     
       // We have no matching route, lets display the home page 
        var mainView = new MainView({});
        mainView.render();
    });

    Backbone.history.start();
  };
  return { 
    initialize: initialize
  };
});
