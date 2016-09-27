angular.module('userSessions.controller', [])

  .controller('UserSessionsCtrl', function ($scope, $state, $ionicHistory, $rootScope) {
    $scope.$on('auth:login-success', function() {
      $ionicHistory.nextViewOptions({
        disableBack: true
      });
      $state.go('app.pantry');
    });

    $scope.$on('auth:login-error', function(ev, reason) {
      $scope.error = reason.errors[0];
    });

    $rootScope.$on('auth:logout-success', function() {
      $ionicHistory.nextViewOptions({
        disableBack: true
      });
      $state.go('app.sign_in');
    });

    $rootScope.$on('auth:logout-error', function(ev, reason) {
      alert('logout failed because ' + reason.errors[0]);
    });


  });
