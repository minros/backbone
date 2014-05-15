// Author: Thomas Davis <thomasalwyndavis@gmail.com>
// Filename: main.js

// Require.js allows us to configure shortcut alias
// Their usage will become more apparent futher along in the tutorial.
require.config({
  shim: {
      underscore: {
          exports: '_'
      },
      jquery: {
          exports: '$'
      },
      googlemaps: {
          exports: 'googlemapbb'
      },
      backbone: {
          deps: [
              'underscore',
              'jquery'
          ],
          exports: 'Backbone'
      },
      parse: {
          deps: ['jquery', 'underscore'],
          exports: 'Parse'
      }
  },
  paths: {
    jquery: 'libs/jquery/jquery-min',
    underscore: 'libs/underscore/underscore-min',
    backbone: 'libs/backbone/backbone-min',
    parse: 'libs/parse/parse',
    googlemapbb: 'libs/backbone/backbone.googlemaps',
    collectionview: 'libs/backbone/backbone.collectionview',
    baseview: 'libs/backbone/backbone.baseview',
    'backbone.associations': 'libs/backbone/backbone-associations',
    templates: '../templates'
  }

});

require([
  // Load our app module and pass it to our definition function
  'app',
  'views/CollegeListView'
], function(App){

  // The "app" dependency is passed in as "App"
  App.initialize();
});
