angular.module('restaurantList', [
    'ngRoute',
    'restaurant',
])

.component('restaurantList', {
    templateUrl: 'restaurant/restaurant-list.html',
    controller: ['Restaurant',
      function RestaurantListController(Restaurant) {
        this.restaurants = Restaurant.query();
      }
    ]
  });


