angular.module('pizzarankApp', [
    'ngRoute',
    'restaurantList',
    'restaurantDetail',
    'restaurant',
    'user',
    'ui.bootstrap',
])

.config(['$locationProvider' ,'$routeProvider',
    function config($locationProvider, $routeProvider) {
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
    }
  ]);