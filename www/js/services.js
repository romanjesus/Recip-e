var app = angular.module("userInfo.service", [])

app.factory('AuthService', function($auth) {
  var currentUser = 3;
  console.log($auth.user);

  return {
    currentUser: function() { return currentUser; }
  };
});
