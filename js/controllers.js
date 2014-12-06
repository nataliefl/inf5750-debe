//Depedencies listed in array. In addition to angular objects 'ng..' we also add our own modules e.g. 'DataElements'
//var controllers = angular.module('Controllers', ['ngAnimate', 'DataElements']);

//Controller attached to list.html view
//NB: Note the order of dependencies and the the consequent identical order of parameters in the function
angular.module('app.controllers',['app.services', 'ui.bootstrap']).
controller('ListController', ['$scope','DataElements', '$location' , '$routeParams', function($scope, DataElements, $location, $routeParams) {

  getPage(1);
  
  $scope.nextPage = function (){
    getPage($scope.currentPage + 1);
  };

  $scope.prevPage = function (){    
    getPage($scope.currentPage - 1);
  };

  $scope.delete=function(id)
  {
    DataElements.delete({'id' : id});
  };

  $scope.getDetails=function(id){
      DataElements.retrieveDetails({'id' : id}).$promise.then(function(data){
          $scope.OpenedItem = data;
      });
  }

  function getPage (page){
    
    var pageCount = $scope.pageCount;
    
    if(page > pageCount)
      page = 1;
    else if(page <= 0)
      page = pageCount;

    DataElements.get({'page': page}).$promise.then(function(data){
      $scope.data = data;
      $scope.currentPage = data.pager.page;
      $scope.pageCount = data.pager.pageCount;
    });

  }

}]).

controller('DetailsController', ['$scope', '$http','$routeParams', function($scope, $http, $routeParams) {

  $scope.elementID=$routeParams.id;
  console.log("Details Controller");

}]);

