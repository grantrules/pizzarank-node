var mod = angular.module('user');

mod.component('loginForm', {
    bindings: {
        email: '=',
        password: '=',
    },
    require: {
        //resCtrl: '^restaurantDetail'
    },
    transclude: true,
    templateUrl: 'user/login.html',
    controller: ['$scope', 'LoginForm', function LoginFormController($scope, LoginForm) {
        $scope.email = 'Email@address.com';
        $scope.password = "";
        $scope.submit = function() {
            LoginForm.login($scope.email, $scope.password);

        }
    }]
    
});


mod.service('LoginForm', ['$http', function($http) {
    return {
        login: function(email,pass) {
            // separate into user model?
            $http.post('/api/login', {'email': email, 'password': pass }).then(function(res){alert('toot')}, function(err){alert(err);});
            
        }
    }
    
}]);