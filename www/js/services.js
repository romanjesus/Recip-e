angular.module("services", [])

.factory("returnedRecipes", [function() {
  this.returnedRecipes;

  var setReturned = function(obj) {
    this.returnedRecipes = obj;
  }

  return { returnedRecipes: this.returnedRecipes, setReturned: setReturned };
}])

.factory("favorites", ['$http', function($http) {
  this.favorites;

  var updateFavorites = function($ctrlScope) {
    this.favorites = httpGetFavs($ctrlScope);
  }

  // PRIVATE METHOD

  var httpGetFavs = function ($ctrlScope) {
    $http.get("https://recip-e.herokuapp.com/api/favorite_recipes")
      .success(function(data) {
        $ctrlScope.favorite_recipes = data;
        return data;
      });
  }

  return { favorites: this.favorites, updateFavorites: updateFavorites };
}])
