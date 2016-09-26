var app = angular.module("userInfo.service", [])

app.factory('AuthService', function($auth) {
  var currentUser = 3;
  console.log($auth);

  // this.getUserFromServer = function(userid) {
  //   User.get(userId).$promise.then(user) { _user = user;  };
  // }

  return {
    currentUser: function() { return currentUser; }
  };
});
