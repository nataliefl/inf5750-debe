var app = angular.module('myApp', [
  'ngRoute',
  'Controllers'
]);


//Initialize our app
app.run(['$rootScope', '$http', '$location',function($rootScope, $http, $location){

//Download the manifest.app
$http.get('/manifest.webapp').
  success(function(data){
    //Only $rootScope is available at run() stage. Makes data available in $scope.
    var url = data.activities.dhis.href;
    if(angular.isUndefined(url)){
      $rootScope.baseUrl = 'http://inf5750-21.uio.no/';
    }else {
      $rootScope.baseUrl = url;
    }
  }).
  error(function(data, status){
    //Fallback to location.href
    $rootScope.baseUrl = $location.absUrl();
  });
//Assign app URL to scope variable, all subsequent controllers can access it
}]);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

 $locationProvider.html5Mode(true); //Remove hash addresses when using HTML5 compatible browsers

  $routeProvider.
  when('/', {
    templateUrl: 'partials/list.html',
    controller: 'ListController'//Page should not reload when searching for query parameter i.e. ? page = ...
  }).
  when('/data-elements/page/', {
    templateUrl: 'partials/list.html',
    controller: 'ListController'
  }).
  otherwise('/');
  



}]);