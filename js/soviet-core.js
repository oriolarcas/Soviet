
var sovietApp = angular.module('sovietApp', [ 'ngRoute', 'ngResource', 'ui.bootstrap' ])
	.factory('userFactory', [ '$resource',
		function($resource) {
			return $resource(
				WPAPI.url+'/users/:uid',
				{_wp_json_nonce:WPAPI.nonce, uid:WPAPI.uid},
				{get: {method:'GET', cache:true}} // override 'get' method
				);
		}])
	.factory('groupsFactory', [ '$resource',
		function($resource) {
			return $resource(
				WPAPI.url+'/bp/groups',
				{_wp_json_nonce:WPAPI.nonce},
				{query: {method:'GET', isArray:true, cache:true}} // override 'query' method
				);
		}])
	.factory('activityFactory', [ '$resource',
		function($resource) {
			/* Note: custom $reosurce methods can only be used in
			 * objects returned by get() queries
			 */
			
/*
 *     @type string|bool $scope Use one of BuddyPress's pre-built filters. In
 *           each case, the term 'current user' refers to the displayed user
 *           when looking at a user profile, and otherwise to the logged-in user.
 *             - 'just-me' retrieves items belonging only to the logged-in user;
 *               this is equivalent to passing a 'user_id' argument
 *             - 'friends' retrieves items belonging to the friends of the
 *               current user
 *             - 'groups' retrieves items associated with the groups to which
 *               the current user belongs
 *             - 'favorites' retrieves the current user's favorited activity
 *               items
 *             - 'mentions' retrieves activity items where the current user has
 *               received an @-mention
 *           The default value of 'scope' is set to one of the above if that
 *           value appears in the appropriate place in the URL; eg, 'scope' will
 *           be 'groups' when visiting http://example.com/members/joe/activity/groups/.
 *           Otherwise defaults to false.
 */
			return {
				site_wide:$resource(
					WPAPI.url+'/bp/activity',
					{_wp_json_nonce:WPAPI.nonce, 'scope':'all'},
					{get: {method:'GET', cache:true}} // override 'get' method
					),
				groups:$resource(
					WPAPI.url+'/bp/activity',
					{_wp_json_nonce:WPAPI.nonce, 'scope':'groups'},
					{get: {method:'GET', cache:true}} // override 'get' method
					),
				mentions:$resource(
					WPAPI.url+'/bp/activity',
					{_wp_json_nonce:WPAPI.nonce, 'scope':'mentions'},
					{get: {method:'GET', cache:true}} // override 'get' method
					)
				};
		}])
	.config([ '$routeProvider', '$locationProvider',
		function ($routeProvider, $locationProvider) {
			$routeProvider
				.when('/', {
					templateUrl: Directory.url + '/views/boot.html',
					controller:  'bootController',
					isBoot: true
				})
				.when('/login', {
					templateUrl: Directory.url + '/views/login.html'
				})
				.when('/main', {
					templateUrl: Directory.url + '/views/main.html',
					controller:  'mainController',
					resolve: {'userData': ['activityFactory', function (activityFactory) {
						var q = activityFactory.groups.get();
						console.log(q);
						return q.$promise;
					}]}
				})
				.otherwise({ redirectTo: '/' });
		}])
	.run(['$rootScope', '$location', function($rootScope, $location){
			$rootScope.wpBaseDir = Directory.url;
			/*$rootScope.$on('$routeChangeSuccess', function(event, current, previous) {
				if (current.isBoot) {
					console.log("Boot: redirecting to main view");
					$location.path('/main');
				}
			});*/
			$rootScope.$on('$routeChangeError', function(event, current, previous, rejection) {
				if (rejection.status == 403) {
					$location.path('/login');
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
	.controller('bootController', [ '$scope', '$location',
		function ($scope, $location) {
			$location.path('/main');
			console.log("Boot: redirecting to main view");
		}])
	.controller('mainController', [ '$scope', '$rootScope', '$route',
			'userFactory', 'groupsFactory', 'activityFactory',
		function ($scope, $rootScope, $route,
				userFactory, groupsFactory, activityFactory) {
			groupsFactory.query(function (response) {
				$scope.groups = response;
			});
			/*
			$scope.groups = {
				1: { name: 'Col·lectiu Diagonal' },
				3: { name: 'Comitè Universitat' },
				4: { name: 'Comitè Central' }
				};
			*/
			$scope.user = { name: 'Oriol', groups: [0], role: 'admin', wpjson: { } };
			// We could use '/users/me' but that causes HTTP redirect,
			// and $http does not add the _wp_json_nonce in the second request
			groupsFactory.query(function (response) {
				$scope.user.wpjson = response;
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


