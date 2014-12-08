/*
 * List Controller module
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

  $scope.save=function(name,shorName,code,description,domainType,valueType,numberType,aggregationOperator,
    storeZeroDataValues,url,categoryCombination,optionSetForDataValues,optionSetForComments,legendSets,rationale,unitMeasure)
  {
    $scope.newData.name=name;
    $scope.newData.shortName=shorName;
    $scope.newData.code=code;
    $scope.newData.description=description;
    $scope.newData.domainType=domainType;
    $scope.newData.numberType=numberType;
    $scope.newData.aggregationOperator=aggregationOperator;
    $scope.newData.zeroIsSignificant=storeZeroDataValues;
    $scope.newData.url=url;
    $scope.newData.categoryCombo.name=categoryCombination;
    $scope.newData.optionSet.name=optionSetForDataValues;
    $scope.newData.commentOptionSet.name=optionSetForComments;
      //$scope.newData.legendSet=legendSets;
      $scope.newData.attributeValues[0].value=rationale;
      $scope.newData.attributeValues[1].value=unitMeasure;
      DataElements.save($scope.newData);
      getPage($scope.currentPage);
    };

  /* 
   * Get page details
   * @Param id Id of page.
  */
    $scope.getDetails=function(id){
      DataElements.retrieveDetails({'id' : id}).$promise.then(function(data){
        $scope.openedItem = data;
        $scope.nameInput = $scope.openedItem.name;
        $scope.shortNameInput=$scope.openedItem.shortName;
        $scope.codeInput=$scope.openedItem.code;
        $scope.descriptionTextArea=$scope.openedItem.description;
        $scope.domainTypeSelector=$scope.openedItem.domainType;
        $scope.valueTypeList=$scope.openedItem.type;
        var textOrNumber;
        if($scope.openedItem.numberType!=null)
        {
          $scope.numberType=$scope.openedItem.numberType;
          textOrNumber="numberType";
        }
        else
        {
          $scope.numberType=$scope.openedItem.textType;
          textOrNumber="textType";
        }
        $scope.aggregationOperatorList=$scope.openedItem.aggregationOperator;
          //$scope.storeZeroDataValuesList=$scope.openedItem.zeroIsSignificant;
          if($scope.openedItem.zeroIsSignificant==true)
          {
            $scope.storeZeroDataValuesList="true";
          }
          else
          {
            $scope.storeZeroDataValuesList="false";
          }
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
          $scope.newData=data;
          /*var jsonObject={"id":id,
              "name":$scope.nameInput,
              "shortName":$scope.shortNameInput,
              "code":$scope.codeInput,
              "description":$scope.descriptionTextArea,
              "domainType":$scope.domainTypeSelector,
              "type":$scope.valueTypeList,
              textOrNumber:$scope.numberType,
              "aggregationOperator":$scope.aggregationOperatorList,
              "zeroIsSignificant":$scope.storeZeroDataValuesList,
              "url":$scope.urlInput,
              "categoryCombo":{"name":$scope.categoryCombinationList},
              "optionSet":{"name":$scope.optionSetForDataValuesList},
              "commentOptionSet":{"name":$scope.optionSetForCommentsList},
              "legendSet":
              {"name":$scope.legendSetsList},
              attributeValues:[
                  {"value":$scope.rationaleInput},
                  {"value":$scope.unitMeasureInput}
              ]
            }*/;

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

