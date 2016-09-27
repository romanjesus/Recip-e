var app = angular.module("userInfo.service", [])

app.factory('AuthService', function($auth, $rootScope) {
  var currentUser = 3;
  // this.getUserFromServer = function(userid) {
  //   User.get(userId).$promise.then(user) { _user = user;  };
  // }
  // console.log($rootScope);

  return {
    currentUser: function() { return currentUser; }
  };
});
