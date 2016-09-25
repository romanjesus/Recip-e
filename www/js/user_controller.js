angular.module("user.controller",[])

.controller("UserCtrl", function($scope, $state, $ionicHistory, $auth){

  $scope.handleRegBtnClick = function() {
      $auth.submitRegistration($scope.registrationForm)
        .then(function() {
          $auth.submitLogin({
            email: $scope.registrationForm.email,
            password: $scope.registrationForm.password
          });
        });
    };

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

