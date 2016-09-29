angular.module("services", [])

.factory("returnedRecipes", [function() {
  this.returnedRecipes;

  var setReturned = function(obj) {
    this.returnedRecipes = obj;
  }

  return { returnedRecipes: this.returnedRecipes, setReturned: setReturned };
}])

.factory("favorites", ['$http', function($http) {

  var updateFavorites = function($ctrlScope) {
    this.favorites = httpGetFavs($ctrlScope);
  }

  var initializeFavorites = function() {
    this.favorites = httpInitGetFavs();
  }

  // PRIVATE METHOD

  var httpGetFavs = function ($ctrlScope) {
    $http.get("http://localhost:3000/api/favorite_recipes")
      .success(function(data) {
        $ctrlScope.favorite_recipes = data;
        return data;
      });
  }

  var httpInitGetFavs = function() {
    $http.get("http://localhost:3000/api/favorite_recipes")
      .success(function(data) {
        return data;
      });
  }

  return { favorites: this.favorites, updateFavorites: updateFavorites, initializeFavorites: initializeFavorites };
}])
