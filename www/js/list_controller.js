var app = angular.module("list.controller",[])
app.controller("listController", function($scope){

  $scope.items = [];

  $scope.data = {
  	showDelete: false
  }

  $scope.addItem = function (itemAmount, itemName) {
   $scope.items.push({
      name: "Matt!"
   });
 };
  
 $scope.removeItem = function (index) {
   $scope.items.splice(index, 1);
 };
})