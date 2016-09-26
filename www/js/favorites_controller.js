angular.module("favorites.controller",[])

.controller("favoritesController", function($scope, $http, $auth, AuthService){

  $scope.getFavorites = function() {
    $http.get("http://localhost:3000/api/users/" + AuthService.currentUser() + "/favorite_recipes")
    .success(function(data){
      // alert("SUCCESS!");
      console.log(data);
      $scope.favorite_recipes = data;
    })
    .error(function(data) {
      alert("ERROR");
    })
  }

})
