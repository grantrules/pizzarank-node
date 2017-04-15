var mod = angular.module('user', [
    'ngRoute',
]);

mod.factory('User', ['$http', '$rootScope',
   function($http, $rootScope) {
       return {
           login: function(user, success, error) {
               $http.post('/login', user).success(function(user){
                $rootScope.user = user;
                success(user);
                }).error(error);
           }
       
    }}

]);