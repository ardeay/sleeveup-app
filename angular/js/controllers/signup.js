'use strict';

// signup controller
app.controller('SignupFormController', ['$scope', '$http', '$state', '$localStorage', function($scope, $http, $state, $localStorage) {
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
            console.log(response);
            if (response.data && response.data.token) {
                var token = response.data.token;
                $http({
                    url: 'https://www.echomtg.com/api/user/meta/',
                    method: "GET",
                    params: {
                        auth: token
                    }
                }).then(function(response) {
                    setCookie(token, response.data.user);
                    $state.go('app.dashboard-v1');
                })
            }
        }, function(response) {
            $scope.authError = response.message;
        });
    };

    var setCookie = function (token, meta) {
        $localStorage.token = token;
        $localStorage.username = meta['username'];
        $localStorage.avatar = meta['avatar'];

    };

  }]);