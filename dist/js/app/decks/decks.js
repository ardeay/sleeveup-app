app.controller('DeckCtrl', ['$rootScope', '$localStorage', '$scope', '$http', '$log', function($rootScope, $localStorage, $scope, $http, $log) {
  $http({
   url: $rootScope.api_endpoint_base + 'lists/all/',
   method: "GET",
   params: {
     auth: $scope.app.auth
   }
 }).then(function (resp) {
    $scope.decks = resp.data.lists;
    console.log($scope.decks)
  });

  $scope.colors = ['primary', 'info', 'success', 'warning', 'danger', 'dark'];
  
  $scope.selectDeck = function(deck){
    angular.forEach($scope.decks, function(deck) {
      deck.selected = false;
    });
    $scope.deck = deck;
    $scope.deck.selected = true;
    
    $http({
     url: $rootScope.api_endpoint_base + 'lists/get/',
     method: "GET",
     params: {
       list: $scope.deck.id,
       auth: $scope.app.auth
     }
   }).then(function (resp) {
      $scope.selectedDeck = resp.data.list;
   })
  };
  
}]);