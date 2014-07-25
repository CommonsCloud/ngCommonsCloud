'use strict';

angular.module('security.service', [
//keeps track of failed requests that need to be retried once the user logs in
'security.retryQueue',
//used to display the login form as a modal modal
'ui.bootstrap.modal'])

.factory('security', ['$http', '$q', '$location', 'securityRetryQueue', '$modal', function($http, $q, $location, queue, $modal){
	
	//redirect to the given url (defaults to '/')
	function redirect(url){
		url = url || '/';
		$location.path(url);
	}

	//login form modal stuff
	var loginDialog = null;
	function openLoginDialog(){
		if(!loginDialog){
			loginDialog = $modal.modal();
			loginDialog.open('security/login/form.html', 'LoginFormController').then(onLoginDialogClose);
		}
	}
	function closeLoginDialog(success){
		if(loginDialog){
			loginDialog.close(success);
			loginDialog = null;
		}
	}
	function onLoginDialogClose(success){
		if(success){
			queue.retryAll();
		} else {
			queue.cancelAll();
			redirect();
		}
	}

	//register a handler for when an item is added to the retry queue
	queue.onItemAddedCallbacks.push(function(retryItem){
		if(queue.hasMore()){
			service.showLogin();
		}
	});

	//the public api of the service
	var service = {
		//get the first reason for needing a login
		getLoginReason: function(){
			return queue.retryReason();
		},
		//show the modal login modal
		showLogin: function(){
			openLoginDialog();
		},
		//attempt to authenticate a user by the given email and pasword
		login: function(email, password){
			var request = $http.post('/login', {
				email: email,
				password: password
			});

			return request.then(function(response){
				service.currentUser = response.data.user;
				if(service.isAuthenticated()){
					closeLoginDialog(true);
				}
			});
		},
		//give up trying to login and clear the retry queue
		cancelLogin: function(){
			closeLoginDialog(false);
			redirect();
		},
		//logout the current user and redirect
		logout: function(redirectTo){
			$http.post('/logout').then(function(){
				service.currentUser = null;
				redirect(redirectTo);
			});
		},
		//ask the backend to see if a user is already authenticated - this may be from a previous session
		requestCurrentUser: function(){
			if(service.isAuthenticated()){
				return $q.when(service.currentUser);
			} else {
				return $http.get('/current-user').then(function(response){
					service.currentUser = response.data.user;
					return service.currentUser;
				});
			}
		},
		//information about the current user
		currentUser: null,
		//is the current user authenticated?
		isAuthenticated: function(){
			return !!service.currentUser;
		},
		//is the current user an administrator?
		isAdmin: function(){
			return !!(service.currentUser && service.currentUser.admin);
		}
	};

	return service;
}]);