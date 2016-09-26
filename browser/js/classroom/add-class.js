app.config(function ($stateProvider){
    $stateProvider.state('addClass', {
        url:'/classrooms/add',
        templateUrl: 'js/classroom/add-class.html',
        controller: 'addClassCtrl'
    })
});

app.controller('addClassCtrl', function($scope, ClassroomFactory, $state){
    $scope.submit = function(info){
        return ClassroomFactory.addOne(info)
        .then($state.go('classrooms'))
    }
        
});