angular.module("recipe.controller",[])

.controller("recipeController", ['$scope', '$http', '$rootScope', '$stateParams', 'returnedRecipes', 'favorites', function($scope, $http, $rootScope, $stateParams, returnedRecipes, favorites) {

	$scope.$on('$ionicView.enter', function() {
    console.log("Recipe view entered");
    getRecipeOnLoad();
    favorites.updateFavorites($scope);
	})


	$scope.findRecipes = function() {
		// console.log($scope.items);
		var post = { "ingredients": cleanList(takeCheckedBoxes($scope.items)) };
		// console.log("posted ingredients: " + post["ingredients"]);
		console.log(angular.toJson(post));
		$http.post("https://recip-e.herokuapp.com/api/ingredients", angular.toJson(post))
		.then(function(response){
      console.log(response);
      $rootScope.recipes = (response.data.body);
      returnedRecipes.setReturned(response.data.body);
    })
	}


	$scope.getRecipe = function(id) {
		var recipe_id = { "id": id }
		$http.post("https://recip-e.herokuapp.com/api/recipe", angular.toJson(recipe_id))
		.then(function(response){
			$rootScope.recipe = response.data.body
			console.log($rootScope.recipe);
		})
	}


	$scope.getInstructions = function(){
		var new_id = { "id": $stateParams.recipeId }
		$http.post("https://recip-e.herokuapp.com/api/instructions", angular.toJson(new_id))
		.then(function(response){
			$rootScope.instructions = response.data.body[0].steps
		})
	}


	$scope.speakText = function(text) {
    window.TTS.speak({
           text: text,
           locale: 'en-JM',
           rate: 1.3
       }, function () {
           // Do Something after success
       }, function (reason) {
           // Handle the error case
        alert(reason+"");
       });
  };


  $scope.addFavorite = function(recipe) {
    console.log($scope.recipe.id);
    $http.post("https://recip-e.herokuapp.com/api/favorite_recipes/" + recipe.id)
    .success(function(data){
      // alert("SUCCESS!");
      console.log(data);
    })
    .error(function(data) {
      alert("ERROR IN ADDING NEW FAVORITE");
    })
  }


  $scope.deleteFavorite = function(recipe) {
    console.log($scope.recipe);
    debugger
    $http.delete("https://recip-e.herokuapp.com/api/favorite_recipes/" + recipe.id)
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

  // 'PRIVATE' METHODS

	var cleanList = function(items) {
		var array = [];
		for(var i = 0; i < items.length; i++){
			array.push(items[i].name)
		}
		return array
	}

	var getRecipeOnLoad = function() {
		var recipe_id = { "id": $stateParams.recipeId }
		$http.post("https://localhost:3000/api/recipe", angular.toJson(recipe_id))
		.then(function(response){
			$rootScope.recipe = response.data.body
			console.log(response);
		})
	}

	var takeCheckedBoxes = function(items) {
		var checkedItems = [];
		for (var i = 0; i < items.length; i++) {
			if(items[i].checked === true){
				checkedItems.push(items[i]);
			}
		}
		return checkedItems;
  }

}])
