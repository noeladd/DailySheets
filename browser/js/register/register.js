app.config(function ($stateProvider) {
    $stateProvider.state('register', {
        url: '/register',
        templateUrl: 'js/register/register.html',
        controller: 'RegisterCtrl'
    });
});

app.controller('RegisterCtrl', function($rootScope, $scope, $state, RegisterFactory){

    $scope.user = {};
    $scope.error = null;

    $scope.register = function(info){
        RegisterFactory.register(info)
    .then(function(){
            $state.go('home');
        })
    .catch(function() {
            $scope.error = 'Invalid registration!'
        })
}
});

app.factory('RegisterFactory', function($http){
    var register = function(userInfo) {
       return $http.post('api/users', userInfo)
    };
    return {register};
})

