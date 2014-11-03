var app = angular.module('artistControllers', ['ngAnimate']);

/*
 * Service that fetches JSON data from the REST API
 * Return a promise object with success and fail properties
 */
app.factory('jsonData', function($http){
  var data = null;
  var promise = $http.jsonp('http://inf5750-21.uio.no/api/dataElements.jsonp?callback=JSON_CALLBACK')
      .success(function(json){
        data = json;
      });
  return {
    promise: promise,
    getData : function(){
      return data;
    }
  }
});

//Controller attached to list.html view
app.controller('ListController', ['$scope', '$http','jsonData', function($scope, $http, jsonData) {
  $scope.data = jsonData.getData();
}]);

//Controller attached to details.html view
app.controller('DetailsController', ['$scope', '$http','$routeParams', function($scope, $http, $routeParams) {
  $http.get('js/data.json').success(function(data) {
    $scope.artists = data;
    $scope.whichItem = $routeParams.itemId;

    if ($routeParams.itemId > 0) {
      $scope.prevItem = Number($routeParams.itemId)-1;
    } else {
      $scope.prevItem = $scope.artists.length-1;
    }

    if ($routeParams.itemId < $scope.artists.length-1) {
      $scope.nextItem = Number($routeParams.itemId)+1;
    } else {
      $scope.nextItem = 0;
    }

  });
}]);

