'use strict';

angular.module('security.login.form', ['services.localizedMessages'])

//the LoginFormController provides the behavior behind a reusable form to allow users to authenticate
//this controller and its template(login/form.html) are used in a modal dialog box by the security service
.controller('LoginFormController', ['$scope', 'security', 'localizedMessages', function($scope, security, localizedMessages){

	//the model for this form
	$scope.user = {};

	//any error message from failing to login
	$scope.authError = null;

	//the reason that we are being asked to login - for instance, because we tried to access something to which we are not authorized (this could be something different for each reason, but this is simplified)
	$scope.authReason = null;
	if(security.getLoginReason()){
		$scope.authReason = (security.isAuthenticated()) ? localizedMessages.get('login.reason.notAuthorized') : localizedMessages.get('login.reason.notAuthenticated');
	}

	//attempt to authenticate the user specified in the form's model
	$scope.login = function(){
		//clear any previous security errors
		$scope.authError = null;

		//try to login
		security.login($scope.user.email, $scope.user.password).then(function(loggedIn){
			if(!loggedIn){
				//if we get here then the login failed due to bad credentials
				$scope.authError = localizedMessages.get('login.error.invalidCredentials');
			}
		}, function(x){
			//if we get here then there was a problem with the login request to the server
			$scope.authError = localizedMessages.get('login.error.serverError', {
				exception: x
			});
		});
	};

	$scope.clearForm = function(){
		user = {};
	};

	$scope.cancelLogin = function(){
		security.cancelLogin();
	};
}]);