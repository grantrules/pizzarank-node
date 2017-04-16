angular.module('pizzarankApp', [
    'ngRoute',
    'restaurantList',
    'restaurantDetail',
    'restaurant',
    'user',
    'ui.bootstrap',
    'angular-jwt',
])

.config(['$locationProvider' ,'$routeProvider', '$httpProvider', 'jwtOptionsProvider',  
    function config($locationProvider, $routeProvider, $httpProvider, jwtOptionsProvider) {
      $locationProvider.hashPrefix('!');

      $routeProvider.
        when('/restaurants', {
          template: '<restaurant-list></restaurant-list>'
        }).
        when('/restaurant/:restaurant_id', {
          template: '<restaurant-detail></restaurant-detail>'
        }).
        when('/profile/:user_id', {
          template: '<profile></profile>'
        }).
        otherwise('/restaurants');
        
        
        // jwt middleware
        jwtOptionsProvider.config({
            authPrefix: "JWT ",
          tokenGetter: function() {
            return localStorage.getItem('id_token');
          }
        });

        $httpProvider.interceptors.push('jwtInterceptor');
    }
  ]);

angular
  .module('pizzarankApp')
  .run(function(authManager) {

    authManager.checkAuthOnRefresh();

  });