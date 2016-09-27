angular.module("recipe.controller",[])

.controller("recipeController", ['$scope', '$http', '$rootScope', function($scope, $http, $rootScope){

	$rootScope.recipes = []
	$rootScope.instructions = []
	$rootScope.recipe = {}

	$scope.$on('$ionicView.enter', function() {
	    console.log("view entered")
	    getRecipeOnLoad();
	});

	$scope.findRecipes = function() {
		var post = { "ingredients": cleanList(takeCheckedBoxes($scope.items)) };
		console.log(post["ingredients"]);
		console.log(angular.toJson(post));
		$http.post("http://localhost:3000/api/ingredients", angular.toJson(post))
		.then(function(response){
      console.log(response);
      $rootScope.recipes = (response.data.body);
    })
	};

	$scope.getRecipe = function(id) {
		var recipe_id = { "id": id }
		$http.post("http://localhost:3000/api/recipe", angular.toJson(recipe_id))
		.then(function(response){
			$rootScope.recipe = response.data.body
			console.log($rootScope.recipe)
		})
	}

	$scope.getInstructions = function(){
		var new_id = { "id": $stateParams.recipeId }
		$http.post("http://localhost:3000/api/instructions", angular.toJson(new_id))
		.then(function(response){
			$rootScope.instructions = response.data.body[0].steps
			console.log($rootScope.instructions)
		})
	}

	var cleanList = function(items) {
		var array = [];
		for(var i = 0; i < items.length; i++){
			array.push(items[i].name)
		}
		return array
	}

	var getRecipeOnLoad = function() {
		var recipe_id = { "id": $stateParams.recipeId }
		$http.post("http://localhost:3000/api/recipe", angular.toJson(recipe_id))
		.then(function(response){
			$rootScope.recipe = response.data.body
			console.log($rootScope.recipe)
		})
	}

	var takeCheckedBoxes = function(items) {
		var checkedItems = [];
		for (var i = 0; i < items.length; i++) {
			if(items[i].checked){
				checkedItems.push(items[i]);
			}
		}
		return checkedItems;
  }

}])
