
var sovietApp = angular.module('sovietApp', [ 'ngRoute', 'ui.bootstrap' ])
	.factory('userFactory', [ '$http', function($http) {
			return {getData: function() {
				return $http.get(
						WPAPI.url+'/users/'+WPAPI.uid+'?_wp_json_nonce='+WPAPI.nonce,
						{cache: true}
					);
			}};
		}])
	.factory('activityFactory', [ '$http', function($http) {
			return {getData: function() {
				return $http.get(
						WPAPI.url+'/bp?_wp_json_nonce='+WPAPI.nonce,
						{cache: true}
					);
			}};
		}])
	.config([ '$routeProvider', '$locationProvider',
		function ($routeProvider, $locationProvider) {
			$routeProvider
				.when('/', {
					templateUrl: Directory.url + '/views/boot.html',
					controller:  'bootController',
					isBoot: true
				})
				.when('/main', {
					templateUrl: Directory.url + '/views/main.html',
					controller:  'mainController',
					resolve: {'userData': ['userFactory', function (userFactory) {
						return userFactory.getData().then(function (response) {
							console.log('main view resolved');
						});
					}]}
				})
				.otherwise({ redirectTo: '/' });
		}])
	.run(['$rootScope', '$location', function($rootScope, $location){
			$rootScope.wpBaseDir = Directory.url;
			$rootScope.$on('$routeChangeSuccess', function(event, current, previous) {
				if (current.isBoot) {
					console.log("Boot: redirecting to main view");
					$location.path('/main');
				}
			});
		}])
	.filter('count', function countFilter() {
			return function (input) {
				var out = input.length;
				if (!out)
					out = 0;
				return out;
			};
		})
	.filter('empty', function emptyFilter() {
			return function (s, alt) {
				return s || alt;
			};
		})
	.controller('bootController', [ '$scope', '$timeout',
		function ($scope, $timeout) {
			$scope.bootprogress = 0;
			var updateboot = function() {
				console.log('bootprogress = '+$scope.bootprogress);
				$scope.bootprogress += 5;	
				if ($scope.bootprogress < 100)
					$timeout(updateboot, 500);
			};
			$timeout(updateboot, 500);
		}])
	.controller('mainController', [ '$scope', '$rootScope', '$route', 'userFactory',
		function ($scope, $rootScope, $route, userFactory) {
			$scope.groups = {
				1: { name: 'Col·lectiu Diagonal' },
				3: { name: 'Comitè Universitat' },
				4: { name: 'Comitè Central' }
				};
			$scope.user = { name: 'Oriol', groups: [1, 3, 4], role: 'admin', wpjson: { } };
			// We could use '/users/me' but that causes HTTP redirect,
			// and $http does not add the _wp_json_nonce in the second request
			userFactory.getData().then(function (response) {
				console.log('getting userFactory data');
				$scope.user.wpjson = response.data;
			});
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


