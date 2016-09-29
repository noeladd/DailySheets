app.config(function($stateProvider){
    $stateProvider.state('classroom', {
        url: '/classroom/:id',
        templateUrl: 'js/classroom/classroom.html',
        controller: 'ClassroomCtrl'
    })
})

app.controller('ClassroomCtrl', function($scope, ClassroomFactory, $stateParams){
    ClassroomFactory.getById($stateParams.id)
    .then(function(classroom){
        console.log(classroom);
        $scope.classroom = classroom.data;
    })
});