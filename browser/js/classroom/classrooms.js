app.config(function($stateProvider){
    $stateProvider.state('classrooms', {
        url:'/classrooms',
        templateUrl: 'js/classroom/classrooms.html',
        controller: 'ClassroomsCtrl',
        resolve: {
            classrooms: function(ClassroomFactory){
                return ClassroomFactory.getAll();
            }
        }
    })
})

app.controller('ClassroomsCtrl', function($scope, classrooms){
    $scope.classrooms = classrooms.data 
})

app.factory('ClassroomFactory', function($http){
    var addOne = function(classroom){
       
       return $http.post('/api/classrooms', classroom)
    }

var getAll = function(){
    console.log('In get all!')
   return $http.get('/api/classrooms')
}

var getById = function(id){
    console.log('In get by Id')
    return $http.get('/api/classrooms/' + id)
}

    return {addOne, getAll, getById}
})