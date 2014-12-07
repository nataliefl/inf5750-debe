var app = angular.module('myApp', [
  'app.controllers',
  'app.services',
  'ngRoute',
   'ngAnimate'
  ]);


//Initialize our app
app.run(['$rootScope', '$http', '$location',function($rootScope, $http, $location){

  var xhReq = new XMLHttpRequest();
    xhReq.open("GET", "manifest.webapp", false);
    xhReq.send(null);
    var serverResponse = JSON.parse(xhReq.responseText);
    $rootScope.baseUrl = serverResponse.activities.dhis.href;

}]);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

  $routeProvider.
  when('/', {
    templateUrl: 'partials/list.html',
    controller: 'ListController'//Page should not reload when searching for query parameter i.e. ? page = ...
  }).
  when('/details/:id', {
    templateUrl: 'partials/details.html',
    controller: 'DetailsController'
  }).
  otherwise('/');
  



}]);