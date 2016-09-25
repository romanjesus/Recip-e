angular.module('userSessions.controller', [])

  .controller('UserSessionsCtrl', function ($scope,$state, $ionicHistory) {
    $scope.$on('auth:login-success', function() {
      $ionicHistory.nextViewOptions({
        disableBack: true
      });
    $state.go('app.pantry');
    });
  });
