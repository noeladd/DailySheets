app.config(function($stateProvider){
    $stateProvider.state('classrooms', {
        url:'/classrooms',
        templateUrl: 'js/classrooms/classrooms.html',
        controller: 'ClassroomCtrl',
        resolve: {
            classrooms: function(ClassroomFactory){
                return ClassroomFactory.getAll();
            }
        }
    })
})

app.controller('ClassroomCtrl', function($scope){
    $scope.classrooms = classrooms 
})

app.factory('ClassroomFactory', function($http){
    var addOne = function(classroom){
       return $http.post('/api/classrooms', classroom)
    }

var getAll = function(){
   return $http.get('/api/classrooms')
}

var getById = function(id){
    return $http.get('/api/classrooms/:id')
}

    return {addOne, getAll, getById}
})