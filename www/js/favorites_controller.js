angular.module("favorites.controller",[])

.controller("favoritesController", ['$scope', 'userId', '$http', function($scope, userId, $http){

  $scope.getFavorites = function() {
    // $auth.validateUser();
    console.log(userId);
    $http.get("http://localhost:3000/api/users/" + userId + "/favorite_recipes")
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
    $http.delete("http://localhost:3000/api/users/" + userId + "/favorite_recipes/" + recipe.body.id)
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
