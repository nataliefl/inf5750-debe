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
 	return $resource($rootScope.baseUrl+'api/:endPointAdr.jsonp', 
 		{'endPointAdr': 'dataElements', 'page': '@page'}, 
 		{ get : {'method' : 'JSONP', 'params' : {'callback' : 'JSON_CALLBACK'}}		
 	});
 }]);
