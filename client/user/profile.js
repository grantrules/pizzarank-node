var mod = angular.module('profile', [
    'ngRoute',
    'user',
]);

mod.component('profile', {
    transclude: true,
    templateUrl: 'user/profile.html',
    controller: ['$routeParams', '$scope', 'User',
      function ProfileController($routeParams, $scope, User) {
          var self = this;
          self.user = User.get({id: $routeParams.user_id});
          this.getUser = function(){return self.user };
      }
    ]
});