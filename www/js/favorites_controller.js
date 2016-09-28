angular.module("favorites.controller",[])

.controller("favoritesController", ['$scope', '$http', function($scope, $http){

  $scope.getFavorites = function() {
    // $auth.validateUser();
    $http.get("https://recip-e.herokuapp.com/api/favorite_recipes")
    .success(function(data){
      // alert("SUCCESS!");
      // debugger
      console.log(data);
      $scope.favorite_recipes = data;
    })
    .error(function(data) {
      alert("ERROR");
    });
  }

  $scope.deleteFavorite = function(recipe) {
    console.log($scope.recipe);
    $http.delete("https://recip-e.herokuapp.com/api/favorite_recipes/" + recipe.body.id)
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

  $scope.addFavorite = function(recipe) {
    console.log($scope.recipe);
    $http.post("https://recip-e.herokuapp.com/api/favorite_recipes/" + recipe.body.id)
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
