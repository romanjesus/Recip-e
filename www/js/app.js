// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'pantry.controller', 'services', 'recipe.controller', 'userSessions.controller','user.controller', 'favorites.controller', 'ng-token-auth'])

.run(function($ionicPlatform, $rootScope, $location, $auth) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $authProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
  })

  .state('app.pantry', {
    url: '/pantry',
    views: {
      'menuContent': {
        templateUrl: 'templates/pantry.html',
        controller: 'pantryController'
      }
    }
  })

  .state('app.recipes', {
    url: '/recipes',
    views: {
      'menuContent': {
        templateUrl: 'templates/recipe_list.html',
      }
    }
  })

  .state('app.favorites', {
    url: '/favorites/:userId',
    views: {
      'menuContent': {
        templateUrl: 'templates/favorites.html',
        controller: 'favoritesController'
      }
    }
  })

  .state('app.sign_in', {
    url: '/sign_in',
    views: {
      'menuContent': {
        templateUrl: 'templates/user_sessions/new.html',
        controller: 'UserSessionsCtrl'
      }
    }
  })

  .state('app.register', {
    url: '/register',
    views: {
      'menuContent': {
        templateUrl: 'templates/users/new.html',
        controller: 'UserCtrl'
      }
    }
  })

  .state('app.recipe', {
    url: "/recipes/:recipeId",
    views: {
      'menuContent' :{
        templateUrl: "templates/show_recipe.html",
        controller: 'recipeController'
      }
    }
  })

  .state('app.recipeInstructions', {
    url: "/recipes/:recipeId/instructions",
    views: {
      'menuContent' :{
        templateUrl: "templates/show_instructions.html",
        controller: 'recipeController'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/sign_in');

  $authProvider.configure({
      apiUrl: 'http://localhost:3000/api'
  })

});
