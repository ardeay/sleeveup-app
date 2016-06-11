'use strict';

/* Controllers */
  // signin controller
app.controller('SigninFormController', ['$scope', '$http', '$state', '$cookies', function($scope, $http, $state, $cookies) {
    $scope.user = {};
    $scope.authError = null;
    $scope.login = function() {
      $scope.authError = null;
      // Try to login
      $http({
       url: 'https://www.echomtg.com/api/user/auth/', 
       method: "POST",
       params: {
         email: $scope.user.email,
         password: $scope.user.password
       }
      })
      .then(function(response) {
        if (response.data && response.data.token) {
          var token = response.data.token;
          $http({
           url: 'https://www.echomtg.com/api/user/meta/',
           method: "GET",
           params: {
             auth: token
           }
          })
          .then(function(response) {
            setCookie(token, response.data.user);
            $state.go('app.dashboard-v1');
          })
        }
      }, function(response) {
        $scope.authError = 'Server Error';
      });
    };
    
    var setCookie = function (token, meta) {
      $cookies.put('token', token);
      for (var key in meta) {
        $cookies.put(key, meta[key]);
      }
    };
    
  }])
;