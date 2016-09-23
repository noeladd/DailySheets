app.config(function ($stateProvider) {
    $stateProvider.state('register', {
        url: '/register',
        templateUrl: 'js/register/register.html',
        controller: 'RegisterCtrl'
    });
});

app.controller('RegisterCtrl', function($rootScope, $scope, $state, $http){

    $scope.user = {};
    $scope.error = null;

    $scope.register = function(userInfo) {

        $http.post('api/users', userInfo)
        .then(function(){
            $state.go('home');
        })
        .catch(function() {
            $scope.error = 'Invalid registration!'
        })
    }
})