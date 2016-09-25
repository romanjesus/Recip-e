angular.module('userSessions.controller', [])

  .controller('UserSessionsCtrl', function ($scope,$state, $ionicHistory) {
    $scope.$on('auth:login-success', function() {
      $ionicHistory.nextViewOptions({
        disableBack: true
      });
      $state.go('app.pantry');
    });

    $scope.$on('auth:login-error', function(ev, reason) {
      $scope.error = reason.errors[0];
      alert("THERE WAS AN ERROR! - " + reason.errors[0]);
    });
  });
