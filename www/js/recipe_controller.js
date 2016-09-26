angular.module("recipe.controller",[])

.controller("recipeController", function($scope, $http, $rootScope){

	$rootScope.recipes = []

	$scope.findRecipes = function() {
		var post = { "ingredients": $scope.items };
		console.log(angular.toJson(post));
		$http.post("http://localhost:3000/api/ingredients", angular.toJson(post))
		.then(function(response){
      console.log(response);
      $rootScope.recipes = (response.data.body);
    })
	};


})

