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