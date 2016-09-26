app.config(function ($stateProvider){
    $stateProvider.state('addChild', {
        url: '/children/add',
        templateUrl: 'js/children/addchild.html',
        controller:'addChildCtrl'
    })
});

app.controller('addChildCtrl', function($scope, ClassroomFactory, ChildFactory){
    ClassroomFactory.getAll()
    .then(function(classrooms){
        console.log(classrooms)
        $scope.classrooms = classrooms.data
    })

    $scope.submit = ChildFactory.add;
})