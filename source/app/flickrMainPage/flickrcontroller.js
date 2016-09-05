
(function(){
	'use strict';
	
	angular.module('flickrSolution').controller('FlickrController',FlickrController);
	
	FlickrController.$inject = ['$scope','$rootScope','FlickrService'];
	
	function FlickrController ($scope,$rootScope,FlickrService){
		
		FlickrService.fetchImages(successData,errorData);
		
		function successData(response)
		{
			$scope.photos = response.photos.photo;
		}
		
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