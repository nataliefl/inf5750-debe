//Depedencies listed in array. In addition to angular objects 'ng..' we also add our own modules e.g. 'DataElements'
//var controllers = angular.module('Controllers', ['ngAnimate', 'DataElements']);

//Controller attached to list.html view
//NB: Note the order of dependencies and the the consequent identical order of parameters in the function
angular.module('app.controllers',['app.services', 'ui.bootstrap']).
controller('ListController', ['$scope','DataElements', '$location' , '$routeParams', function($scope, DataElements, $location, $routeParams) {
  pageInit();

  function pageInit(){
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

  }

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
          $scope.openedItem = data;
          $scope.nameInput = $scope.openedItem.name;
          $scope.shortNameInput=$scope.openedItem.shortName;
          $scope.codeInput=$scope.openedItem.code;
          $scope.descriptionTextArea=$scope.openedItem.description;
          $scope.domainTypeSelector=$scope.openedItem.domainType;
          $scope.valueTypeList=$scope.openedItem.type;
          if($scope.openedItem.numberType!=null)
          {
              $scope.numberType=$scope.openedItem.numberType;
          }
          else
          {
              $scope.numberType=$scope.openedItem.textType;

          }
          $scope.aggregationOperatorList=$scope.openedItem.aggregationOperator;
          $scope.storeZeroDataValuesList=$scope.openedItem.zeroIsSignificant;
          $scope.urlInput=$scope.openedItem.url;
          $scope.categoryCombinationList=$scope.openedItem.categoryCombo.name;
          $scope.optionSetForDataValuesList=$scope.openedItem.optionSet.name;
          $scope.optionSetForCommentsList=$scope.openedItem.commentOptionSet.name;
          $scope.legendSetsList=$scope.openedItem.legendSet.name;
          /*if($scope.openedItem.legendSet.name indexOf)*/
          $scope.nationalCheckbox=($scope.openedItem.aggregationLevels.indexOf(1)>=0)?true:false;
          $scope.districtCheckbox=($scope.openedItem.aggregationLevels.indexOf(2)>=0)?true:false;
          $scope.chiefdomCheckbox=($scope.openedItem.aggregationLevels.indexOf(3)>=0)?true:false;
          $scope.facilityCheckbox=($scope.openedItem.aggregationLevels.indexOf(4)>=0)?true:false;
          $scope.rationaleInput=$scope.openedItem.attributeValues[0].value;
          $scope.unitMeasureInput=$scope.openedItem.attributeValues[1].value;
      });
  };
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

