
var sovietApp = angular.module('sovietApp', [ 'ngRoute', 'ui.bootstrap' ])
	.config([ '$routeProvider', '$locationProvider',
		function ($routeProvider, $locationProvider) {
			$routeProvider
				.when('/', {
					templateUrl: 'views/main.html',
					controller:  'mainController'
				})
				.otherwise({ redirectTo: '/' });
		}])
	.controller('mainController', [ '$scope', '$route',
		function ($scope, $route) {
			$scope.customers = [
				{ name: 'Josep', city: 'Barcelona' },
				{ name: 'Maria', city: 'Girona' }
			];
			$scope.isCollapsed = false;
		}])
	.controller('headerController', [ '$scope', '$route',
		function ($scope, $route) {
			$scope.notifications = [
				{ description: 'Notificació 1', action: 'index.html#/' },
				{ description: 'Notificació 2', action: 'index.html#/profile' },
				{ description: 'Notificació 3', action: 'index.html#/group' }
			];
		}]);

