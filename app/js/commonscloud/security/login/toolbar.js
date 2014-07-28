'use strict';

angular.module('security.login.toolbar', [])

//the loginToolbar directive is a reusable widget that can show login or logout buttons and information about the current authenticated user

.directive('loginToolbar', ['security', function(security){
	var directive = {
		templateUrl: 'js/commonscloud/security/login/toolbar.html',
		restrict: 'E',
		replace: true,
		scope: true,
		link: function($scope, $element, $attrs, $controller){
			$scope.isAuthenticated = security.isAuthenticated;
			$scope.login = security.showLogin;
			$scope.logout = security.logout;
			$scope.$watch(function(){
				return security.currentUser;
			}, function(currentUser){
				$scope.currentUser = currentUser;
			});
		}
	};
	return directive;
}]);