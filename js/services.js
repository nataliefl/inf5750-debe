 /*
 * Service that fetch dataelements from the DHIS API.
 *
 * Returns a $resource object. E.g. usage DataElements.function.$promise.then(function(data){ ... })
 */
 (function (){
     angular.module('app.services', ['ngResource', 'ngRoute']).
     factory('DataElements', ['$rootScope','$resource', function($rootScope, $resource){
      return $resource( $rootScope.baseUrl + 'api/:endPointAdr/:id',
      {
       'endPointAdr': 'dataElements', 
       'callback' : 'JSON_CALLBACK'
   },
 /*
  * Retrieve dataelement legends.
  *
  * @return $promise. 
  * E.g. DataElements.retrieveLegends().$promise...
  */
  {
    retrieveLegends:
    {

     'method' : 'JSONP',
     'params' :
     {
         'format' : 'jsonp',
         'endPointAdr' : 'mapLegendSets',
         'paging' : 'false'
     }
 },
 /*
  * Retrieve dataelement options.
  *
  * @return $promise. 
  * E.g. DataElements.retrieveOptions().$promise...
  */
  retrieveOptions:
  {
    'method' : 'JSONP',
    'params' :
    {
        'format' : 'jsonp',
        'endPointAdr' : 'optionSets',
        'paging' : 'false'
    }

},
 /*
  * Retrieve dataelement categories.
  *
  * @return $promise. 
  * E.g. DataElements.retrieveCategories().$promise...
  */
  retrieveCategories:
  {
     'method' : 'JSONP',
     'params' :
     {
         'format' : 'jsonp',
         'endPointAdr' : 'categoryCombos',
         'paging' : 'false'
     }
 },
 /*
  * Retrieve dataelement details.
  *
  * @param {'id':id} Id of dataelement.
  * @return $promise. 
  * E.g. DataElements.retrieveDetails({'id':id}).$promise...
  */
  retrieveDetails:
  {
    'method' : 'JSONP',
    'params' :
    {
        'format' : 'jsonp',
        'id' : '@id'
    }
},
 /*
  * Retrieve a page containing multiple elements.
  *
  * @param {'page':page} Page number.
  * @return $promise. 
  * E.g. DataElements.get({'page':page}).$promise...
  */
  get : 
  {
    'method' : 'JSONP',  
    'params' : 
    {
     'format' : 'jsonp',
     'page' : '@page',
     'fields' : 'id,name'
 }
},
/*
  * Delete an element.
  *
  * @param {'id':id} Dataelement id.
  * @return $promise. 
  * E.g. DataElements.delete({'id':id}).$promise...
  */
  delete :
  {
    'method' : 'DELETE',
    'params' : 
    {
     'id' : '@id'
 }
},
/*
  * Save an element. Properties on dataelement that are not a @param will be transmitted in the message body.
  *
  * @param {'id':id} Dataelement id.
  * @return $promise. 
  * E.g. DataElements.delete({'id':id}).$promise...
  */
  save :
  {
    'method' : 'PUT',
    'params' :
    {
        'id' : '@id'
    }
}

});
}]);
})();