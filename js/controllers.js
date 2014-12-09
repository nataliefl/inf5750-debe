/*
 * List Controller. Fetch data elements from servers. 
 */
 (function() {
  angular.module('app.controllers',['app.services', 'ui.bootstrap']).
  controller('ListController', ['$scope','DataElements', '$location' , '$routeParams', function($scope, DataElements, $location, $routeParams) {

    getPage(1);

    $scope.nextPage = function (){
      getPage($scope.currentPage + 1);
    };

    $scope.prevPage = function (){
      getPage($scope.currentPage - 1);
    };

    function getPage (page){
      var pageCount = $scope.pageCount ? $scope.pageCount : 1;
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
/*
 * Details Controller. Gets data element details and subsequent dependencies from server. 
 */
 controller('DetailsController', ['$scope','$stateParams', 'DataElements', function($scope, $stateParams, DataElements) {

  $scope.JsonElement={};
  getDetails($stateParams.id);

  DataElements.retrieveCategories().$promise.then(function(data){
    $scope.categoryItems=data.categoryCombos;
  });


  DataElements.retrieveOptions().$promise.then(function(data){
    $scope.optionItems=data.optionSets;
  });

  DataElements.retrieveLegends().$promise.then(function(data){
    $scope.legendItems=data.mapLegendSets;
  });


  $scope.delete=function(id)
  {
    DataElements.delete({'id' : id});
    location.reload();
    getPage($scope.currentPage);
  };
  $scope.save=function(JsonElement)
  {
    console.log($scope.JsonElement.nameInput);
    console.log($scope.newData);
    $scope.newData.name= $scope.JsonElement.nameInput;
    $scope.newData.shortName=$scope.JsonElement.shortNameInput;
    $scope.newData.code=$scope.JsonElement.codeInput;
    $scope.newData.description=$scope.JsonElement.descriptionTextArea;
    $scope.newData.domainType=$scope.JsonElement.domainTypeSelector;
    $scope.newData.type=$scope.JsonElement.valueTypeList;
    $scope.newData.numberType=$scope.JsonElement.numberType;

    $scope.newData.aggregationOperator=$scope.JsonElement.aggregationOperatorList;
    $scope.newData.zeroIsSignificant=$scope.JsonElement.storeZeroDataValuesList;
    $scope.newData.url=$scope.JsonElement.urlInput;



//                $scope.newData.categoryCombo.name=$scope.JsonElement.categoryCombinationList;
//                $scope.newData.categoryCombo.name=$scope.JsonElement.categoryCombinationList;
//                $scope.newData.optionSet.name=$scope.JsonElement.optionSetForDataValuesList;
//                $scope.newData.commentOptionSet.name=$scope.JsonElement.optionSetForCommentsList;
//                $scope.newData.legendSet=$scope.JsonElement.legendSetsList;
//                $scope.newData.attributeValues[0].value=$scope.JsonElement.rationaleInput;
//                $scope.newData.attributeValues[1].value=$scope.JsonElement.unitMeasureInput;

DataElements.save($scope.newData);
getPage($scope.currentPage);
};

function getDetails(id){
  DataElements.retrieveDetails({'id' : id}).$promise.then(function(data){
    $scope.openedItem = data;

    $scope.JsonElement.nameInput = $scope.openedItem.name;
    $scope.JsonElement.shortNameInput=$scope.openedItem.shortName;
    $scope.JsonElement.codeInput=$scope.openedItem.code;
    $scope.JsonElement.descriptionTextArea=$scope.openedItem.description;
    $scope.JsonElement.domainTypeSelector=$scope.openedItem.domainType;
    $scope.JsonElement.valueTypeList=$scope.openedItem.type;
    var textOrNumber;
    if($scope.openedItem.numberType!=null)
    {
      $scope.JsonElement.numberType=$scope.openedItem.numberType;
      textOrNumber="numberType";
    }
    else
    {
      $scope.JsonElement.numberType=$scope.openedItem.textType;
      textOrNumber="textType";
    }
    $scope.JsonElement.aggregationOperatorList=$scope.openedItem.aggregationOperator;
                    //$scope.storeZeroDataValuesList=$scope.openedItem.zeroIsSignificant;
                    if($scope.openedItem.zeroIsSignificant==true)
                    {
                      $scope.JsonElement.storeZeroDataValuesList="true";
                    }
                    else
                    {
                      $scope.JsonElement.storeZeroDataValuesList="false";
                    }
                    $scope.JsonElement.urlInput=$scope.openedItem.url;
                    // $scope.JsonElement.categoryCombinationList=$scope.openedItem.categoryCombo.name;
                    $scope.JsonElement.optionSetForDataValuesList=($scope.openedItem.optionSet)?$scope.openedItem.optionSet.name:"";
                    $scope.JsonElement.optionSetForCommentsList=($scope.openedItem.commentOptionSet)?$scope.openedItem.commentOptionSet.name:"";
                    $scope.JsonElement.legendSetsList=($scope.openedItem.legendSet)?$scope.openedItem.legendSet.name:"";
                    /*if($scope.openedItem.legendSet.name indexOf)*/
                    // $scope.JsonElement.nationalCheckbox=($scope.openedItem.aggregationLevels.indexOf(1)>=0)?true:false;
                    // $scope.JsonElement.districtCheckbox=($scope.openedItem.aggregationLevels.indexOf(2)>=0)?true:false;
                    // $scope.JsonElement.chiefdomCheckbox=($scope.openedItem.aggregationLevels.indexOf(3)>=0)?true:false;
                    // $scope.JsonElement.facilityCheckbox=($scope.openedItem.aggregationLevels.indexOf(4)>=0)?true:false;
                    // $scope.JsonElement.rationaleInput=($scope.openedItem.attributeValues[0])?($scope.openedItem.attributeValues[0].attribute.name=="Rationale")?$scope.openedItem.attributeValues[0].value:$scope.openedItem.attributeValues[1].value:"";
                    // $scope.JsonElement.unitMeasureInput=($scope.openedItem.attributeValues[1])?($scope.openedItem.attributeValues[1].attribute.name=="Unit of measure")?$scope.openedItem.attributeValues[1].value:$scope.openedItem.attributeValues[0].value:"";
                    $scope.newData=data;

                  });
};

}]);
})();