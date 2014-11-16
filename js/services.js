var services = angular.module('DataElements', ['ngResource', 'ngRoute']);
/**
 * Services are the communication channel between Controllers and the Web.
 */

/*
 * Talks to the DHIS REST api
 *
 * getJSONP : Fetch JSONP data
 * putJSON : Update data
 * postJSON : Post new data
 *
 * Returns a promise object.
 */
 services.factory('DataElements', ['$rootScope','$resource', function($rootScope, $resource){
 	return $resource('http://inf5750-21.uio.no/api/:endPointAdr.jsonp', 
 		{'endPointAdr': 'dataElements', 'page': '@page'}, 
 		{ get : {'method' : 'JSONP', 'params' : {'callback' : 'JSON_CALLBACK'}}		
 	});
 }]);
