var app = angular.module("list.controller",[])
app.controller("listController", function($scope, $ionicModal, $timeout){

	$scope.items = [];
	$scope.item = "";

  // Create the login modal that we will use later
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

  $scope.submitItemForm = function() {
    console.log('Adding Item', $scope.item);
    var input = this.item
    if(input.length > 0){
    	$scope.addItem(input);
  	}
    $timeout(function() {
      $scope.closeItemForm();
    }, 100);
  };

  $scope.data = {
  	showDelete: false
  };

  $scope.addItem = function (item) {
  	$scope.items.push(item);
	};
  
	$scope.removeItem = function (index) {
  	$scope.items.splice(index, 1);
	};
})