'use strict';

// signup controller
app.controller('SignupFormController', ['$scope', '$http', '$state', function($scope, $http, $state) {
    $scope.user = {};
    $scope.authError = null;
    $scope.signup = function() {
      $scope.authError = null;
      // Try to create new user
        $http({
            url: 'https://www.echomtg.com/api/user/register/',
            method: "POST",
            params: {
                email: $scope.user.email,
                password: $scope.user.password,
                username: $scope.user.username,
                app: 'sleeveup'
            }
        }) .then(function(response) {
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