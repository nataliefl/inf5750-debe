/*
 * List Controller module. Depends on the DataElements service.
 * Fetches data elements with all dependant data items from the server. 
 * Updates the view.
 */
 angular.module('app.controllers',['app.services', 'ui.bootstrap']).
 controller('ListController', ['$scope','DataElements', '$location' , '$routeParams', function($scope, DataElements, $location, $routeParams) {

  getPage(1);

  DataElements.retrieveCategories().$promise.then(function(data){
    $scope.categoryItems=data.categoryCombos;
  });

  DataElements.retrieveOptions().$promise.then(function(data){
    $scope.optionItems=data.optionSets;
  });


  DataElements.retrieveLegends().$promise.then(function(data){
    $scope.legendItems=data.mapLegendSets;
  });

  /* 
   * Get the next page. 
   */
   $scope.nextPage = function (){
    getPage($scope.currentPage + 1);
  };

  /* 
   * Get the previous page.
   *
   */
   $scope.prevPage = function (){
    getPage($scope.currentPage - 1);
  };

  /* 
   * Delete a page
   * @Param id Id of page.
   */
   $scope.delete=function(id)
   {
    DataElements.delete({'id' : id});
  };

  $scope.save=function()
  {
      // DataElements.save($scope.newData);
      console.log($scope.currentElement.name);
      // getPage($scope.currentPage);
    };

  /* 
   * Get element details
   * @Param id Id of page.
   */
   $scope.getDetails=function(id){
    DataElements.retrieveDetails({'id' : id}).$promise.then(function(data){
      console.log(data);
      // $scope.currentElement = data;
    });
  };

 /* 
   * Get a page
   * @Param page Id of page.
   */
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

}]).controller('DetailsController', ['$scope', '$http','$routeParams', function($scope, $http, $routeParams) {

  $scope.elementID=$routeParams.id;
  console.log("Details Controller");

}]);

