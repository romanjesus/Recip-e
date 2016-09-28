angular.module("services", [])

.factory("returnedRecipes", [function() {
  this.returnedRecipes;

  var setReturned = function(obj) {
    this.returnedRecipes = obj;
  }

  return { returnedRecipes: this.returnedRecipes, setReturned: setReturned };
}])

.factory("favorites", ['$http', function($http) {
  var initializeFavorites = function() {
    if(!this.favorites) {
      this.favorites = httpGetFavs();
    });
  }

  var getFavorites = function() {
    this.favorites = httpGetFavs();
  }

  // PRIVATE METHOD

  var httpGetFavs = function () {
    $http.get("https://recip-e.herokuapp.com/api/favorite_recipes")
      .success(function(data){
        return data;
      });
  }

  return { favorites: this.favorites, initializeFavorites: initializeFavorites, getFavorites: getFavorites };
}])
