'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('MyCtrl1', ['$scope', '$log', 'Application', 'Template', 'Feature', 'Field', function($scope, $log, Application, Template, Feature, Field) {
	
	//initialize app choices
	$scope.applications = [
		{
			name: 'Blue Water Baltimore WQM Enterprise',
			id: 142
		},
		{
			name: 'CommonsCloud Community Datasets',
			id: 145
		},
		{
			name: 'FracTracker iOS',
			id: 2
		},
		{
			name: 'FracTracker National Map',
			id: 131
		},
		{
			name: 'NFWF BMP Monitoring and Assessment',
			id: 147
		},
		{
			name: 'Pennsylvania Watershed Grants',
			id: 144
		},
		{
			name: 'Raptors',
			id: 148
		},
		{
			name: 'Viable Industries Website',
			id: 146
		},
		{
			name: 'Water Reporter',
			id: 105
		}	
	];

	var id;

	//click functions to get the app data
	$scope.getApplication = function(appId){
		Application.get({id:appId}, function(data){
			$scope.application = data;
			$log.log('application', data);
		});
	};

	$scope.getTemplates = function(appId){
		Template.query({id:appId}, function(data){
			$scope.templates = data;
			$log.log('templates', data);
		});
	};

	$scope.getTemplate = function(id){
		Template.get({templateId:id}, function(data){
			$scope.template = data.response;
			$log.log('template', data.response);
		});
	};

	$scope.getFeatures = function(table){
		Feature.query({storage:table}, function(data){
			$scope.features = data.response.features;
			$log.log('features', data.response);
		});
	};

	$scope.getFeature = function(table, id){
		Feature.get({storage:table, featureId:id}, function(data){
			$scope.feature = data.response;
			$log.log('feature', data.response);
		});
	};

	$scope.getFields = function(id){
		Field.query({templateId:id}, function(data){
			$scope.fields = data;
			$log.log('fields', data);
		});
	};

	$scope.getField = function(table, id){
		Field.get({templateId:table, fieldId:id}, function(data){
			$scope.field = data.response;
			$log.log('field', data.response);
		});
	};
  }])

  .controller('MyCtrl2', ['$scope', function($scope) {

  }]);
