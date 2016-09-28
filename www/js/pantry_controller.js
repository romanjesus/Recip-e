angular.module("pantry.controller",[])

.controller("pantryController", ['$scope', '$ionicModal', '$timeout', '$http', '$state', 'checkedIngredients', 'listOfIngredients', function($scope, $ionicModal, $timeout, $http, $state, checkedIngredients, listOfIngredients){

  var myItems = $scope.items;

	$scope.items = [];
	$scope.item = "";
  $scope.checkCount = 0;
  $scope.selectToggle = "Select";

	$scope.data = {
  	showDelete: false
  };


  $ionicModal.fromTemplateUrl('templates/add_item.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });


  $scope.openItemForm = function() {
    $scope.modal.show();
  };


  $scope.closeItemForm = function() {
    $scope.modal.hide();
  };


  $scope.countUpdate = function(itemStatus) {
    if (itemStatus === true) {
      $scope.checkCount++;
      if ($scope.checkCount === $scope.items.length){
        $scope.selectToggle = "Deselect";
      }
    } else {
      $scope.checkCount--;
      if ($scope.selectToggle === "Deselect"){
        $scope.selectToggle = "Select";
      }
    }
  }


  $scope.selectAllChecks = function() {
    if ($scope.selectToggle === "Select") {
      for(var i = 0; i < $scope.items.length; i++) {
        $scope.items[i].checked = true;
      }
      $scope.selectToggle = "Deselect";
    } else {
      for(var i = 0; i < $scope.items.length; i++) {
        $scope.items[i].checked = false;
      }
      $scope.selectToggle = "Select";
    }
  }


  $scope.submitItemForm = function() {
    var input = this.item;
    console.log('Adding Item', input);
    if(input.length > 0){
    	$scope.addItem(input);
  	}
    $timeout(function() {
      $scope.closeItemForm();
    }, 100);
    this.item = "";
  };


  $scope.addItem = function (item) {
  	if ($scope.items.indexOf(item) == -1) {
    	$scope.items.push({name: item});
		}
	};


	$scope.removeItem = function (index) {
  	$scope.items.splice(index, 1);
	};


  $scope.getList = function() {
    $http.get("https://recip-e.herokuapp.com/api/pantry")
    .then(function(response){
      console.log(response.data[0]);
      $scope.items = response.data;
      listOfIngredients.setIngredients(response.data);
      return response
    })
  };


  $scope.saveList = function() {
    console.log("Sent save request!");
    console.log($scope.items);
    var postData = {"ingredients": $scope.items}
    $http.post("https://recip-e.herokuapp.com/api/pantry", angular.toJson(postData))
    .then(function(response) {
      console.log('Successfully saved!')
    })
  }


  // Watch to see if we return to the page.
  $scope.$on('$ionicView.enter', function(view) {
    console.log("Pantry view entered");
    // If we do then set all the checkboxes to false.
    // *** Needed to overwrite on a back.
    // Also, reset the delete buttons and the toggle display.
    for(var i = 0; i < $scope.items.length; i++) {
      $scope.items[i].checked = false;
    }
    $scope.data.showDelete = false;
    $scope.selectToggle = "Select";
  });

  // Watch to see if we leave the page.
  // If so stop before leaving the page and save to the database.
  $scope.$on('$ionicView.leave', function() {
    console.log("LEAVING");
  });

}])
