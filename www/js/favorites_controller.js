angular.module("favorites.controller",[])

.controller("favoritesController", function($scope, $rootScope, $http, $auth){

  $scope.getFavorites = function() {
    console.log($rootScope.user.id);
    // debugger
    $http.get("http://localhost:3000/api/users/" + $rootScope.user.id + "/favorite_recipes")
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

})
