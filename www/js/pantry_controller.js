angular.module("pantry.controller",[])

.controller("pantryController", ['$scope', '$ionicModal', '$timeout', '$http', '$state', 'returnedRecipes', 'favorites', function($scope, $ionicModal, $timeout, $http, $state, returnedRecipes, favorites){

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

    var category = angular.element(document).find('select').val();
    var item = this.item;
    console.log('Adding Item:', item);
    console.log('Adding Category:', category);
    if(item.length > 0){
    	$scope.addItem(item, category);
    }
    $timeout(function() {
      $scope.closeItemForm();
    }, 100);
    this.item = "";
    this.category = "";
  };

  $scope.addItem = function (item, category) {
    var item = item[0].toUpperCase() + item.slice(1)

    console.log(item)

    if ($scope.items.indexOf(item) == -1) {
    	$scope.items.push({name: item, category_id: category});
    }
  };

  $scope.removeItem = function (index) {
  	$scope.items.splice(index, 1);
  };

  $scope.getList = function() {
    $http.get("https://recip-e.herokuapp.com/api/pantry")
    .then(function(response){

      $scope.items = response.data;
      for(var i = 0; i < $scope.items.length; i ++) {
        if ($scope.items[i].category_id == '1') {
          $scope.items[i].category_id = 'Dairy'
        } else if ($scope.items[i].category_id == '2') {
          $scope.items[i].category_id = 'Produce'
        }
        else if ($scope.items[i].category_id == '3') {
          $scope.items[i].category_id = 'Beverages'
        }
        else if ($scope.items[i].category_id == '4') {
          $scope.items[i].category_id = 'Meat'
        }
        else if ($scope.items[i].category_id == '5') {
          $scope.items[i].category_id = 'Bakery'
        }
        else if ($scope.items[i].category_id == '6') {
          $scope.items[i].category_id = 'Pantry'
        }
        else  {
          $scope.items[i].category_id = 'Frozen'
        }
      }
      return response
    })

  }


  $scope.saveList = function() {
    if ($scope.items[0]) {
      for(var i = 0; i < $scope.items.length; i ++) {
        if ($scope.items[i].category_id === "Dairy") {
          $scope.items[i].category_id = '1'
        } else if ($scope.items[i].category_id === "Produce") {
          $scope.items[i].category_id = '2'
        } else if ($scope.items[i].category_id === 'Beverages') {
          $scope.items[i].category_id = '3'
        } else if ($scope.items[i].category_id === 'Meat') {
          $scope.items[i].category_id = '4'
        } else if ($scope.items[i].category_id === 'Bakery') {
          $scope.items[i].category_id = '5'
        } else if ($scope.items[i].category_id === 'Pantry') {
          $scope.items[i].category_id = '6'
        } else  {
          $scope.items[i].category_id = '7'
        }
      }
    }
    var postData = {"ingredients": $scope.items}

    $http.post("https://recip-e.herokuapp.com/api/pantry", angular.toJson(postData))
    .then(function(response) {
      // response
    })
  }


  // Watch to see if we return to the page.
  $scope.$on('$ionicView.enter', function(view) {
    // If we do then set all the checkboxes to false.
    // *** Needed to overwrite on a back.
    // Also, reset the delete buttons and the toggle display.
    for(var i = 0; i < $scope.items.length; i++) {
      $scope.items[i].checked = false;
    }
    $scope.data.showDelete = false;
    $scope.selectToggle = "Select";
    favorites.initializeFavorites();
  });


  // Watch to see if we leave the page.
  // If so stop before leaving the page and save to the database.
  $scope.$on('$ionicView.leave', function() {
    angular.element(document).find('select').remove()
    if (angular.element(document).find('label').hasClass('cat-select')) {
      angular.element(document).find('label').append("<select class='cat-value'><option name='category' ng-model=\"category\" ng-value=\"'Dairy'\" >Dairy</option><option name=\"category\" ng-model=\"category\" ng-value=\"'Produce'\">Produce</option><option name=\"category\" ng-model=\"category\" ng-value=\"'Beverages'\">Beverages</option><option name=\"category\" ng-model=\"category\" ng-value=\"'Meat'\">Meat</option><option name=\"category\" ng-model=\"category\" ng-value=\"'Bakery'\">Bakery</option><option name=\"category\" ng-model=\"category\" ng-value=\"'Pantry'\">Pantry</option><option name=\"category\" ng-model=\"category\" ng-value=\"'Frozen'\">Frozen</option></select>")
    }
    $scope.saveList();
  });

}])
