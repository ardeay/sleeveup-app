'use strict';

// signup controller
app.controller('SignupFormController', ['$rootScope','$scope', '$http', '$state', function($rootScope, $scope, $http, $state) {
    $scope.user = {};
    $scope.authError = null;
    // log user out
    localStorage.clear();
    delete $scope.app.user;

    $scope.signup = function() {

        $scope.authError = null;
        // Try to create new user
        $http({
            url: api_endpoint_base + 'user/register/',
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
                    url: api_endpoint_base + 'user/meta/',
                    method: "GET",
                    params: {
                        auth: token
                    }
                }).then(function(response) {
                    // set variable locally
                    localStorage.setItem('auth_token',token);
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