
(function(){
	'use strict';
	
	var app = angular.module('flickrSolution',['ui.router','ui.bootstrap','ngCookies','ngResource']);
	
	app.config(['$stateProvider','$urlRouterProvider','$httpProvider', function ($stateProvider,$urlRouterProvider,$mdThemingProvider,$httpProvider){
		$urlRouterProvider.otherwise('/flickr');
		
		$stateProvider.state('flickr' , {
			url:'/flickr',
			templateUrl: 'app/flickrMainPage/flickr.html',
			controller: 'FlickrController'
			
		});
	}]);
	
	
	app.run(function($rootScope, $location, $state, $stateParams) {
		console.log('Run');
		//getConfig.getConfigurationJson();
		
		 $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){ 
	           
	        })
	        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams, options){ 
	            
	        })

	        $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error){ 
	            
	        })
	        
	        $rootScope.$on('$locationChangeSuccess', function(event, absUrl, oldUrl, locationState, oldState) {
				
	        
				
				
			})
		
	});
	

	
	
})();