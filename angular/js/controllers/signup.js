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
            if (response.data && response.data.token) {
                var token = response.data.token;
                $http({
                    url: 'https://www.echomtg.com/api/user/meta/',
                    method: "GET",
                    params: {
                        auth: token
                    }
                }).then(function(response) {
                    // set variable locally
                    $localStorage.token = token;
                    // uses custom function that extends the local storage base functionality
                    localStorage.setObject('usermeta',response.data.user);
                    $scope.app.user = response.data.user;
                    $state.go('app.dashboard-v1');
                })
            }
        }, function(response) {
            $scope.authError = response.message;
        });
    };

}]);