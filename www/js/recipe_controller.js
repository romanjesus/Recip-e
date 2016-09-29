angular.module("recipe.controller",[])

.controller("recipeController", ['$scope', '$http', '$rootScope', '$stateParams', 'returnedRecipes', 'favorites', function($scope, $http, $rootScope, $stateParams, returnedRecipes, favorites) {

	$scope.$on('$ionicView.enter', function() {
    getRecipeOnLoad();
    favorites.updateFavorites($scope);
	})


	$scope.findRecipes = function() {
		var post = { "ingredients": cleanList(takeCheckedBoxes($scope.items)) };
		$http.post("https://recip-e.heroku-app.com/api/ingredients", angular.toJson(post))
		.then(function(response){
      $rootScope.recipes = (response.data.body);
      returnedRecipes.setReturned(response.data.body);
    })
	}


	$scope.getRecipe = function(id) {
    console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
		var recipe_id = { "id": id }
		$http.post("https://recip-e.heroku-app.com/api/recipe", angular.toJson(recipe_id))
		.then(function(response){
			$rootScope.recipe = response.data.body;
      $scope.favorited = response.data.headers.favorited;
		})
	}


	$scope.getInstructions = function(){
		var new_id = { "id": $stateParams.recipeId }
		$http.post("https://recip-e.heroku-app.com/api/instructions", angular.toJson(new_id))
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
    $http.post("https://recip-e.heroku-app.com/api/favorite_recipes/" + recipe.id)
    .success(function(data){
      // alert("SUCCESS!");
    })
    .error(function(data) {
      alert("ERROR IN ADDING NEW FAVORITE");
    })
  }


  $scope.deleteFavorite = function(recipe) {
    $http.delete("https://recip-e.heroku-app.com/api/favorite_recipes/" + recipe.id)
    .success(function(data){
      // alert("SUCCESS!");
      // debugger
      $scope.favorite_recipes = data;
    })
    .error(function(data) {
      alert("ERROR");
    })
  }


  $scope.favoriteRouter = function(recipe) {
    if (!$scope.favorited) {
      $scope.addFavorite(recipe);
      $scope.favorited = true;
    } else {
      $scope.deleteFavorite(recipe);
      $scope.favorited = false;
    }
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
		$http.post("https://recip-e.heroku-app.com/api/recipe", angular.toJson(recipe_id))
		.then(function(response){
			$rootScope.recipe = response.data.body
      if (response.data.headers) {
        $scope.favorited = response.data.headers.favorited;
      }
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
