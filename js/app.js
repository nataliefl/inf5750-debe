(function(){


var app = angular.module('myApp', ['app.controllers','app.services','ui.router']);

/*
* Donwload the app's manifest. Sets the base URL based on href property of manifest.
*/
app.run(['$rootScope', '$http', '$location',function($rootScope, $http, $location){

  var xhReq = new XMLHttpRequest();
  xhReq.open("GET", "manifest.webapp", false);
  xhReq.send(null);
  var serverResponse = JSON.parse(xhReq.responseText);
  $rootScope.baseUrl = serverResponse.activities.dhis.href;

}]).
/*
* Setup page routing. The list and details view.
*/
config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

  //Default route
  $urlRouterProvider.otherwise('index');

  $stateProvider.
  state('index', {
    url:"/index",
    templateUrl : 'partials/list.html',
    controller: "ListController"
  }).
  state('index.details', {
    url: "/details/:id",
    templateUrl : 'partials/details.html',
    controller: 'DetailsController'
  });

}]);
})();