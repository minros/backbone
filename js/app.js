// Filename: app.js
define([
  'jquery', 
  'underscore',
  'backbone',
  'parse',
  'router' // Request router.js
], function($, _, Backbone, Parse, Router){
  var initialize = function(){
    // Initialize Parse
    Parse.initialize("R0DvNR5Dt622yjhcCBFNSdPj9elbljgzscYCccAO", "IChs94CYy2igVLf7cv6QiZuCnsAIJW3NHWEdecCk");
    // Pass in our Router module and call it's initialize function
    Router.initialize();
  };

  return { 
    initialize: initialize
  };
});
