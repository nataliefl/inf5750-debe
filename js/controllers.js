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
      getPage($scope.currentPage);
      location.reload();
  };
  $scope.save=function(name,shorName,code,description,domainType,valueType,numberType,aggregationOperator,
        storeZeroDataValues,url,categoryCombination,optionSetForDataValues,optionSetForComments,legendSets,rationale,unitMeasure)
  {
      $scope.newData.name=(name)?name:"";
      $scope.newData.shortName=(shorName)?shorName:"";
      $scope.newData.code=(code)?code:"";
      $scope.newData.description=(description)?description:"";
      $scope.newData.domainType=(domainType)?domainType:"";
      $scope.newData.numberType=(numberType)?numberType:"";
      $scope.newData.aggregationOperator=(aggregationOperator)?aggregationOperator:"";
      $scope.newData.zeroIsSignificant=(storeZeroDataValues)?storeZeroDataValues:"";
      $scope.newData.url=(url)?url:"";
      $scope.newData.categoryCombo=(categoryCombination)?{"name":categoryCombination}:{"name":""};
      $scope.newData.optionSet=(optionSetForDataValues)?{"name":optionSetForDataValues}:{"name":""};
      $scope.newData.commentOptionSet=(optionSetForComments)?{"name":optionSetForComments}:{"name":""};
      //$scope.newData.legendSet=legendSets;
      $scope.newData.attributeValues[0]=(rationale)?{"value":rationale}:{"value":""};
      $scope.newData.attributeValues[1]=(unitMeasure)?{"value":unitMeasure}:{"value":""};
      DataElements.save($scope.newData);
      getPage($scope.currentPage);
      location.reload();
  };

  $scope.getDetails=function(id){
      DataElements.retrieveDetails({'id' : id}).$promise.then(function(data){
          $scope.openedItem = data;
          $scope.nameInput = ($scope.openedItem.name)?$scope.openedItem.name:"";
          $scope.shortNameInput=($scope.openedItem.shortName)?$scope.openedItem.shortName:"";
          $scope.codeInput=($scope.openedItem.code)?$scope.openedItem.code:"";
          $scope.descriptionTextArea=($scope.openedItem.description)?$scope.openedItem.description:"";
          $scope.domainTypeSelector=($scope.openedItem.domainType)?$scope.openedItem.domainType:"";
          $scope.valueTypeList=($scope.openedItem.type)?$scope.openedItem.type:"";
          var textOrNumber;
          if($scope.openedItem.numberType!=null)
          {
              $scope.numberType=($scope.openedItem.numberType)?$scope.openedItem.numberType:"";
              textOrNumber="numberType";
          }
          else
          {
              $scope.numberType=($scope.openedItem.textType)?$scope.openedItem.textType:"";
              textOrNumber="textType";
          }
          $scope.aggregationOperatorList=($scope.openedItem.aggregationOperator)?$scope.openedItem.aggregationOperator:"";
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
          $scope.categoryCombinationList=($scope.openedItem.categoryCombo/*.name*/)?$scope.openedItem.categoryCombo.name:"";
          $scope.optionSetForDataValuesList=($scope.openedItem.optionSet/*.name*/)?$scope.openedItem.optionSet.name:"";
          $scope.optionSetForCommentsList=($scope.openedItem.commentOptionSet/*.name*/)?$scope.openedItem.commentOptionSet.name:"";
          $scope.legendSetsList=($scope.openedItem.legendSet/*.name*/)?$scope.openedItem.legendSet.name:"";
          /*if($scope.openedItem.legendSet.name indexOf)*/
          $scope.nationalCheckbox=($scope.openedItem.aggregationLevels.indexOf(1)>=0)?true:false;
          $scope.districtCheckbox=($scope.openedItem.aggregationLevels.indexOf(2)>=0)?true:false;
          $scope.chiefdomCheckbox=($scope.openedItem.aggregationLevels.indexOf(3)>=0)?true:false;
          $scope.facilityCheckbox=($scope.openedItem.aggregationLevels.indexOf(4)>=0)?true:false;
          $scope.rationaleInput=($scope.openedItem.attributeValues[0]/*.value*/)?$scope.openedItem.attributeValues[0].value:"";
          $scope.unitMeasureInput=($scope.openedItem.attributeValues[1]/*.value*/)?$scope.openedItem.attributeValues[1].value:"";
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

