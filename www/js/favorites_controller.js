angular.module("favorites.controller",[])

.controller("favoritesController", function($scope, $http){

  $scope.getFavorites = function() {
    $http.get("http://recip-e.herokuapp.com/api/user/" + user.id + "/favorite_recipes")
    .success(function(data){
      // alert("SUCCESS!");
      console.log(data)
      $scope.favorite_recipes = data;
    })
    .error(function(data) {
      alert("ERROR");
    })
  }

})
