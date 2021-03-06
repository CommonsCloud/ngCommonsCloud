'use strict';

angular.module('security.interceptor', ['security.retryQueue'])

// This http interceptor listens for authentication failures
.factory('securityInterceptor', ['$injector', '$log', 'securityRetryQueue', function($injector, $log, queue){
	return function(promise){
		var $http = $injector.get('$http');
		//null indicates that the promise should not be intercepted if it is resolved successfully
		return promise.then(null, function(response){
			$log.log('intercepted response', response);
			if(response.status === 401 || response.status === 403){
				$log.log('response was intercepted');
				// The request bounced because it was not authorized - add a new request to the retry queue
				promise = queue.pushRetryFn('unauthorized-server', function(){
					return $http(response.config);
				});
			}
			return promise;
		});
	};
}])

// We have to add the interceptor to the queue as a string because the interceptor depends upon service instances that are not available in the config block.
.config(['$httpProvider', function($httpProvider) {
  $httpProvider.responseInterceptors.push('securityInterceptor');
}]);