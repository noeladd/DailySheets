app.config(function($stateProvider){
    $stateProvider.state('classroom', {
        url: '/classrooms/:id',
        templateUrl: 'js/classrooms/classroom.html',
        controller: 'ClassroomCtrl',
        resolve: {
            classroom: function(ClassroomFactory, $stateParams){
                ClassroomFactory.getById($stateParams.id)
            }
        }
    })
})

app.controller('ClassroomCtrl', function($scope, classroom){
    $scope.classroom = classroom;
})