'use strict';

/* Controllers */
  // signin controller
app.controller('SigninFormController', ['$scope', '$http', '$state', '$localStorage', function($scope, $http, $state, $localStorage) {
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
         password: $scope.user.password,
           app: 'sleeveup'
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
              // set variable locally

              $localStorage.token = token;
              localStorage.setObject('usermeta',esponse.user);
              $localStorage.username = response.user.username;
              $localStorage.avatar = response.user.avatar;


            $state.go('app.dashboard-v1');
          })
        }
      }, function(response) {
        $scope.authError = response.message;
      });
    };

    
  }])
;