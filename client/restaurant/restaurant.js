var mod = angular.module('restaurant', ['ngResource']);

mod.factory('Restaurant', ['$resource',
    function($resource) {
      return $resource('/api/restaurants/:id', {}, {
        query: {
            method: 'GET',
            isArray: true,
        }
      });
    }
  ]);

mod.factory('Rating', ['$resource',
   function($resource) {
       return $resource('/api/ratings/:id', {}, {
           'create': {
               method: 'POST',
           }
       });
   }

]);

mod.controller('SearchCtrl', ['$scope', '$http', function($scope, $http){
    
    $scope.getRestaurants = function(val) {
        return $http.get('/api/restaurantsearch', {
            params: {
            name: val
        }
    }).then(function(response){
        return response.data.map(function(item){
            return item.name;
        });
    });
  };

}]);