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
