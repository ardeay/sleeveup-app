'use strict';

/* Controllers */

angular.module('app')
.controller('AppCtrl', ['$rootScope','$scope', '$translate', '$state', '$location', '$localStorage', '$window', '$http',
function($rootScope, $scope,   $translate, $state, $location, $localStorage, $window, $http) {
  // add 'ie' classes to html
  var isIE = !!navigator.userAgent.match(/MSIE/i);
  if(isIE){ angular.element($window.document.body).addClass('ie');}
  if(isSmartDevice( $window ) ){ angular.element($window.document.body).addClass('smart')};
  
  // force HTTPS function, checks for local host for working locally
  var forceSSL = function () {
    if ($location.protocol() !== 'https' && $location.host() != '127.0.0.1') {
      $window.location.href = $location.absUrl().replace('http', 'https');
    }
  };
  
  // forces HTTPS redirect
  forceSSL();
  
  $rootScope.api_endpoint_base = "https://www.echomtg.com/api/";
  
  // config
  $scope.app = {
    name: 'SleeveUp',
    version: '0.0.3',
    // for chart colors
    color: {
      primary: '#7266ba',
      info:    '#23b7e5',
      success: '#27c24c',
      warning: '#fad733',
      danger:  '#f05050',
      light:   '#e8eff0',
      dark:    '#3a3f51',
      black:   '#1c2b36'
    },
    settings: {
      themeID: 1,
      navbarHeaderColor: 'bg-black',
      navbarCollapseColor: 'bg-white-only',
      asideColor: 'bg-black',
      headerFixed: true,
      asideFixed: false,
      asideFolded: false,
      asideDock: false,
      container: false
    }
  }
  
  
  // login logic function
  $scope.isLoggedIn = function() {
    return ((typeof(localStorage.auth_token) == undefined) || localStorage.auth_token== null) ? false : true;
  }
  
  // login check
  $rootScope.getToken = function () {
    if ( $scope.isLoggedIn() )  {
      var userObject = localStorage.getObject('usermeta');
      $scope.app.user = userObject;
      $scope.app.auth = localStorage.auth_token
      return $scope.app.auth
    } else {
      $location.path('access/signin')
    }
  }
  
  $rootScope.getToken();
  
  // checks if the user is a contributor
  // this will show or not show contributor specific navigation
  $scope.isContributor = function() {
    if(!$scope.isLoggedIn() ) {
      return false;
    } else if($scope.app.user.contributor >= 1) {
      return true;
    } else {
      return false;
    }
  }
  
  var milestone = function() {
    $http({
     url: 'https://api.github.com/repos/sleeveup/sleeveup-app/milestones',
     method: "GET"
   }).then(function (response) {
      $scope.milestones = response.data;
      for (var i = 0; i < $scope.milestones.length; i++) {
        var closed = response.data[i].closed_issues;
        var open = response.data[i].open_issues;
        var total = closed + open;
        var percent = 0;
        if (total > 0) {
          percent = closed / total * 100;
        }
        if (percent < 32) {
          $scope.milestones[i].type = 'danger';
        } else if (percent > 33 && percent < 65) {
          $scope.milestones[i].type = 'warning';
        } else if (percent > 66 && percent < 99) {
          $scope.milestones[i].type = 'info';
        } else {
          $scope.milestones[i].type = 'success';
        }
        $scope.milestones[i].percent = percent;
      }
    });
  }
  
  milestone();
  
  // save settings to local storage
  if ( angular.isDefined($localStorage.settings) ) {
    $scope.app.settings = $localStorage.settings;
  } else {
    $localStorage.settings = $scope.app.settings;
  }
  $scope.$watch('app.settings', function(){
    if( $scope.app.settings.asideDock  &&  $scope.app.settings.asideFixed ){
      // aside dock and fixed must set the header fixed.
      $scope.app.settings.headerFixed = true;
    }
    // for box layout, add background image
    $scope.app.settings.container ? angular.element('html').addClass('bg') : angular.element('html').removeClass('bg');
    // save to local storage
    $localStorage.settings = $scope.app.settings;
  }, true);
  
  // angular translate
  $scope.lang = { isopen: false };
  $scope.langs = {en:'English', de_DE:'German', it_IT:'Italian'};
  $scope.selectLang = $scope.langs[$translate.proposedLanguage()] || "English";
  $scope.setLang = function(langKey, $event) {
    // set the current lang
    $scope.selectLang = $scope.langs[langKey];
    // You can change the language during runtime
    $translate.use(langKey);
    $scope.lang.isopen = !$scope.lang.isopen;
  };
  
  function isSmartDevice( $window ) {
    // Adapted from http://www.detectmobilebrowsers.com
    var ua = $window['navigator']['userAgent'] || $window['navigator']['vendor'] || $window['opera'];
    // Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
    return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
  }
  
}]);
