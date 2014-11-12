var services = angular.module('DataElements', ['ngResource']);
/**
 * Services are the communication channel between Controllers and the Web.
 */

/*
 * Talks to the DHIS REST API
 *
 * getJSONP : Fetch JSONP data
 * putJSON : Update data
 * postJSON : Post new data
 *
 * Returns a promise object.
 */
services.factory('DataElements',['$resource', function($resource){
    return $resource('http://inf5750-21.uio.no/api/dataElements.jsonp', {}, {
        getJSONP : {'method' : 'JSONP', 'params' : {'callback' : 'JSON_CALLBACK'}}
    });
}]);