'use strict';

/* Controllers */
  // signin controller
app.controller('SigninFormController', ['$scope', '$http', '$state', function($scope, $http, $state) {
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
        console.log("booyeah", response)
      }, function(x) {
        $scope.authError = 'Server Error';
      });
    };
  }])
;