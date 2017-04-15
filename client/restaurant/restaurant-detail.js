var mod = angular.module('restaurantDetail', [
    'ngRoute',
    'restaurant',
//    'rating'
]);

mod.component('restaurantDetail', {
    transclude: true,
    templateUrl: 'restaurant/restaurant-detail.html',
    controller: ['$routeParams', '$scope', 'Restaurant',
      function RestaurantDetailController($routeParams, $scope, Restaurant) {
          var self = this;
          self.restaurant = Restaurant.get({id: $routeParams.restaurant_id});
          this.getRestaurant = function(){return self.restaurant };
      }
    ]
});