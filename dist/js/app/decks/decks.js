app.controller('DeckCtrl', ['$rootScope', '$localStorage', '$scope', '$http', '$log', 'uiGridConstants', function($rootScope, $localStorage, $scope, $http, $log, uiGridConstants) {
  $scope.listOfCards = [{name: ''}];
  $scope.gridOptions = {
    enableFiltering: true,
    showFooter: true,
    rowHeight: 25,
    columnDefs: [
      { name: 'name', aggregationType: uiGridConstants.aggregationTypes.count},
      { name: 'expansion', aggregationType: uiGridConstants.aggregationTypes.count},
      { name: 'colors', aggregationType: uiGridConstants.aggregationTypes.avg},
      { name: 'tcg_low', enableFiltering: false}
    ]
  };
  $http({
   url: $rootScope.api_endpoint_base + 'lists/all/',
   method: "GET",
   params: {
     auth: $rootScope.getToken()
   }
 }).then(function (resp) {
    $scope.decks = resp.data.lists;
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
      $scope.listOfCards = createCardArray($scope.selectedDeck);
      console.log($scope.selectedDeck)
      $scope.gridOptions = {
        data: $scope.listOfCards
      };
   })
  };
  var createCardArray = function (deck) {
    var returnObject = [];
    var i = 0;
    for (var key in deck.card_list) {
      var card = deck.card_list[key];
      returnObject[i] = {
          "name": card.name,
          "expansion": card.expansion,
          "colors": card.colors,
          "tcg_low": card.tcg_low
      }
      i++;
    }
    return returnObject
  }
  
}]);