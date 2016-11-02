 angular.module("favorites.controller",[])

.controller("favoritesController", ['$scope', '$http', 'favorites', '$rootScope', function($scope, $http, favorites, $rootScope){

  $scope.getFavorites = function() {
    favorites.updateFavorites($scope);
  }

  $scope.deleteFavorite = function(recipe) {
    $http.delete("https://recip-e.herokuapp.com/api/favorite_recipes/" + recipe.body.id)
    .success(function(data){
      $scope.favorite_recipes = data;
    })
    .error(function(data) {
      console.log(data)
      alert("ERROR");
    })
  }

}])
