(function(){
	
	'use strict';
	
	angular.module('flickrSolution').factory('FlickrService',FlickrService);
	
	FlickrService.$inject = ['$http','$rootScope','FlickrConstants'];
	
	function FlickrService($http,$rootScope,FlickrConstants)
	{
		var service = {
				
				fetchImages : fetchImages
		};
		
		function fetchImages(successCallBack,errorCallBack)
		{
			var _url= FlickrConstants.BaseURI+"?method=flickr.people.getPublicPhotos&api_key="+FlickrConstants.ApiKey+"&user_id="
						+FlickrConstants.UserId+"&format=json&nojsoncallback=1";
			$http({
				method : 'GET',
				url : _url,
				cache : false
			}).success(function(data, status, headers, config) {
				if (status === 200) {
					successCallBack(data);
				} else {
					errorCallBack(data);
				}
			}).error(function(data, status, headers, config) {
				errorCallBack(data);
			});
			
		}
		

		return service;
	}	
})();