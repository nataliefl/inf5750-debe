var app = angular.module('myApp', [
  'ngRoute',
  'Controllers'
]);


//Initialize our app
app.run(['$rootScope', '$http', '$location',function($rootScope, $http, $location){

//Download the manifest.app
$http.get('/manifest.webap').
  success(function(data){
    //Only $rootScope is available at this stage. Makes data available to $scope.
    $rootScope.baseURL = data.activities.dhis.href;
  }).
  error(function(data, status){
    //Fallback to location.href
    $rootScope.baseURL = $location.absUrl();
  });
//Assign app URL to scope variable, all subsequent controllers can access it
}]);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
  when('/', {
    templateUrl: 'partials/list.html',
    controller: 'ListController'
        /*resolve: { //Get API data before the controller instantiates
          'DHISData': function (jsonData){
            return jsonData.promise;
          }
        }*/
  }).
  when('/details/:itemId', {
    templateUrl: 'partials/details.html',
    controller: 'DetailsController'
  }).
  otherwise({
    redirectTo: '/'
  });



}]);