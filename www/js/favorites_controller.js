 angular.module("favorites.controller",[])

.controller("favoritesController", ['$scope', '$http', 'favorites', '$rootScope', function($scope, $http, favorites, $rootScope){

  $scope.getFavorites = function() {
    favorites.updateFavorites($scope);
  }

  $scope.deleteFavorite = function(recipe) {
    console.log($scope.recipe);
    debugger
    $http.delete("https://localhost:3000/api/favorite_recipes/" + recipe.body.id)
    .success(function(data){
      // alert("SUCCESS!");
      // debugger
      console.log(data);
      $scope.favorite_recipes = data;
    })
    .error(function(data) {
      alert("ERROR");
    })
  }

}])
