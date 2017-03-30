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

/* ===== 


var ratingmod = angular.module('rating', [
    'ngRoute',
    'restaurant'
]);

mod.component('rating', {
    templateUrl: 'restaurant/rating.html',
    controller: ['$routeParams', 'Restaurant',
      function RestaurantDetailController($routeParams, Restaurant) {
          var self = this;
          self.restaurant = Restaurant.get({id: $routeParams.restaurant_id});
      }
    ]
});

/* ===== */


//make a ratings module??
/* WORKS
mod.controller('RatingFormController', ['$scope', 'RatingForm', function($scope, RatingForm) {
     $scope.title = 'Enter title';
    $scope.body = "Write your review";
    $scope.rating = 5;
    $scope.submit = function() {
        RatingForm.save({});
        // doot

    }
}]);
*/