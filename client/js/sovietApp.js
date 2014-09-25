
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
	.filter('count', function () {
			return function (input) {
				var out = input.length;
				if (!out)
					out = 0;
				return out;
			};
		})
	.filter('empty', function () {
			return function (s, alt) {
				return s || alt;
			};
		})
	.controller('mainController', [ '$scope', '$route',
		function ($scope, $route) {
			$scope.groups = {
				1: { name: 'Col·lectiu Diagonal' },
				3: { name: 'Comitè Universitat' },
				4: { name: 'Comitè Central' }
				};
			$scope.user = { name: 'Oriol', groups: [1, 3, 4], role: 'admin' };
			$scope.isCollapsed = false;
		}])
	.controller('headerController', [ '$scope', '$route',
		function ($scope, $route) {
			$scope.notifications = [
				{ description: 'Notificació 1', action: 'index.html#/', seen: true },
				{ description: 'Notificació 2', action: 'index.html#/profile', seen: false },
				{ description: 'Notificació 3', action: 'index.html#/group', seen: true }
			];
		}]);


