
(function(){
	'use strict';
	
	angular.module('flickrSolution').controller('FlickrController',FlickrController);
	
	FlickrController.$inject = ['$scope','$rootScope','FlickrService'];
	
	function FlickrController ($scope,$rootScope,FlickrService){
		
		/***Service to Fetch All the Photos ***/
		FlickrService.fetchImages(successData,errorData);
		
		/***Success CallBack Function ****/
		function successData(response)
		{
			$scope.photos = response.photos.photo;
		}
		
		/***Error CallBack Function ****/
		function errorData(response)
		{
			
		}
		$scope.sortByAplhabetical = 'title';
		
		function render()
		{
			
		}
		render();


		
	}
})();