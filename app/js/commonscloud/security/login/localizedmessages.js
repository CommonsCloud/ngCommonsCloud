'use strict';

angular.module('services.localizedMessages', [])

.factory('localizedMessages', function(){
	return {
		get: function(authReason){
			var response;

			switch(authReason){
				case 'login.reason.notAuthorized':
					response = 'You must be an authorized user to access this page.';
					return response;
				case 'login.reason.notAuthenticated':
					response = 'You must log in to access this page.';
					return response;
				case 'login.reason.invalidCredentials':
					response = 'The email or password you entered is not valid. Please try again.';
					return response;
				case 'login.reason.serverError':
					response = 'There was an error with the server. Please try again.';
					return response;
			}
		}
	};
});