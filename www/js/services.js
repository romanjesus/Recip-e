angular.module("services", [])

.factory("returnedRecipes", [function() {
  this.returnedRecipes;

  var setReturned = function(obj) {
    this.returnedRecipes = obj;
  }

  return { returnedRecipes: this.returnedRecipes, setReturned: setReturned };
}])

.factory("favorites", ['$http', function($http) {
  var getFavorites = function() {
    if(!this.favorites) {
      $http.get("https://recip-e.herokuapp.com/api/favorite_recipes")
      .success(function(data){
        console.log(data);
        debugger
        this.favorites = data;
      });
    }
  }

  return { favorites: this.favorites, getFavorites: getFavorites };
}])
