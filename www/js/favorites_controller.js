angular.module("favorites.controller",[])

.controller("favoritesController", ['$scope', 'message', function($scope, message, $http, $rootScope){

  $scope.getFavorites = function() {
    // $auth.validateUser();
    console.log($rootScope.user.id);
    $http.get("http://localhost:3000/api/users/" + $rootScope.user.id + "/favorite_recipes")
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
    $http.delete("http://localhost:3000/api/users/" + $rootScope.user.id + "/favorite_recipes/" + recipe.body.id)
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
