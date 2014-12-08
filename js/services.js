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
 /*
  * Talks to the DHIS REST api
  *
  * retrieveLegends : retrieve Legends of data
  *
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
  * Talks to the DHIS REST api
  *
  * retrieveOptions : retrieve options of data
  *
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
 * Talks to the DHIS REST api
 *
 * retrieveCategories : retrieve Categories of data
 *
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
 * Talks to the DHIS REST api
 *
 * retrieveDetails : retrieve details of data
 *
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
 * Talks to the DHIS REST api
 *
 * get: Fetch JSONP data
 *
 */
 		get : 
 		{
 			'method' : 'JSONP',  
 			'params' : 
 			{
 				'format' : 'jsonp',
 				'page' : '@page'
 			}
 		},
 /*
 * Talks to the DHIS REST api
 *
* delete : delete data
 *
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
* Talks to the DHIS REST api
 *
 * save : Update data
 *
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
