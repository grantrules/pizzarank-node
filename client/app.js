angular.module('pizzarankApp', [
    'ngRoute',
    'restaurantList',
    'restaurantDetail',
    'restaurant',
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
        otherwise('/restaurants');
    }
  ]);