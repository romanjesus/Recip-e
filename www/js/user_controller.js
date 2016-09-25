angular.module("user.controller",[])

.controller("UserCtrl", function($scope, $state, $ionicHistory){
  $scope.$on('auth:registration-email-success', function() {
    $ionicHistory.nextViewOptions({
      disableBack: true
    });
    $state.go('app.pantry');
  });

  $scope.$on('auth:registration-email-error', function(ev, reason) {
    $scope.error = "Invalid registration entry!"
  });
})

