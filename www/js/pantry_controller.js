angular.module("pantry.controller",[])

.controller("pantryController", ['$scope', '$ionicModal', '$timeout', '$http', '$rootScope', function($scope, $ionicModal, $timeout, $http, $rootScope){

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

  $scope.selectAllChecks = function() {
    if ($scope.selectToggle === "Select") {
      debugger
      for(var i = 0; i < $scope.items.length; i++) {
        $scope.items[i].checked = "true";
      }
      $scope.selectToggle = "Deselect";
    } else {
      for(var i = 0; i < $scope.items.length; i++) {
        $scope.items[i].checked = "false";
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
    $http.get("http://localhost:3000/api/pantry")
    .then(function(response){
      console.log(response.data[0]);
      $scope.items = response.data;
      return response
    })
  };

  $scope.saveList = function() {
    console.log("Sent save request!");
    console.log($scope.items);
    var postData = {"ingredients": $scope.items}
    $http.post("http://localhost:3000/api/pantry", angular.toJson(postData))
    .then(function(response) {
      console.log('Successfully saved!')
    })
  }

  $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams, options, myItems){
    // Watch to see if we return to the page.
    // If we do then set all the checkboxes to false. *** Needed to overwrite on a back.
    if (toState.name === "app.pantry") {
      for(var i = 0; i < $scope.items.length; i++) {
        $scope.items[i].checked = "false";
      }
      $scope.data.showDelete = false;
    }

  })

}])
