app.config(function ($stateProvider){
    $stateProvider.state('addClass', {
        url:'/classrooms/add',
        templateUrl: 'js/classrooms/add-class.html',
        controller: 'addClassCtrl'
    })
});

app.controller('addClassCtrl', function($scope, ClassroomFactory, $state){
    $scope.submit = function(info){
        ClassroomFactory.addOne(info)
        .then(function(){
            $state.go(classrooms)
        })
    };
})