//Depedencies listed in array. In addition to angular objects 'ng..' we also add our own modules e.g. 'DataElements'
var controllers = angular.module('Controllers', ['ngAnimate', 'DataElements']);

//Controller attached to list.html view
//NB: Note the order of dependencies and the the consequent identical order of parameters in the function
controllers.controller('ListController', ['$scope','DataElements', '$location' , '$routeParams', function($scope, DataElements, $location, $routeParams) {

  $scope.data = DataElements.get({});

  $scope.nextPage = function (){
   if(checkNested($scope, 'data', 'pager','nextPage')){
    var url = $scope.data.pager.nextPage;
    $scope.data = getPage(url);
  }
};

$scope.prevPage = function (){    
  if(checkNested($scope, 'data', 'pager','prevPage')){
    var url = $scope.data.pager.prevPage;
    $scope.data = getPage(url);
  }
};

function getPage (url){
  return DataElements.get({'page': url.split("page=").pop() });
}

function checkNested() {
  var args = Array.prototype.slice.call(arguments), obj = args.shift();

  for (var i = 0; i < args.length; i++) {
    if (!obj || !obj.hasOwnProperty(args[i])) {
      return false;
    }
    obj = obj[args[i]];
  }
  return true;
}

}]);


//Controller attached to details.html view
controllers.controller('DetailsController', ['$scope', '$http','$routeParams', function($scope, $http, $routeParams) {
  // $scope.elementDetails = DataElements.getJSONP($routeParams.id)
  

  console.log("Details Controller");
  // $http.get('js/data.json').success(function(data) {
  //   $scope.artists = data;
  //   $scope.whichItem = $routeParams.itemId;

  //   if ($routeParams.itemId > 0) {
  //     $scope.prevItem = Number($routeParams.itemId)-1;
  //   } else {
  //     $scope.prevItem = $scope.artists.length-1;
  //   }

  //   if ($routeParams.itemId < $scope.artists.length-1) {
  //     $scope.nextItem = Number($routeParams.itemId)+1;
  //   } else {
  //     $scope.nextItem = 0;
  //   }

  // });
}]);

