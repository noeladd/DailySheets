app.config(function($stateProvider){
    $stateProvider.state('child', {
        url: '/child/:id',
        templateUrl: 'js/children/child.html',
        controller: 'ChildCtrl'
    })
});

app.controller('ChildCtrl', function($scope, ChildFactory, $stateParams){
    return ChildFactory.getOne($stateParams.id)
    .then(function(child){
        $scope.child = child.data;
    })
})