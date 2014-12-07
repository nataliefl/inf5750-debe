/*
 * Talks to the DHIS REST api
 *
 * getJSONP : Fetch JSONP data
 * putJSON : Update data
 * postJSON : Post new data
 *
 * Returns a promise object.
 */
 angular.module('app.services', ['ngResource', 'ngRoute']).
 factory('DataElements', ['$rootScope','$resource', function($rootScope, $resource){
 	return $resource( $rootScope.baseUrl + 'api/:endPointAdr/:id',
 	{
 		'endPointAdr': 'dataElements', 
 		'callback' : 'JSON_CALLBACK'
 	},
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
        retrieveDetails:
        {
            'method' : 'JSONP',
            'params' :
            {
                'format' : 'jsonp',
                'id' : '@id'
            }
        },
 		get : 
 		{
 			'method' : 'JSONP',  
 			'params' : 
 			{
 				'format' : 'jsonp',
 				'page' : '@page'
 			}
 		},
 		delete : 
 		{
 			'method' : 'DELETE',
 			'params' : 
 			{
 				'id' : '@id'
 			}
 		}

 	});
 }]);
