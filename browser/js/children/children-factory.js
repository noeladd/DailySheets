app.factory('ChildFactory', function($http){
    let getAll = function(){
        return $http.get('/api/children')
        .then(function(response){
            return response.data;
        })
    }
    let add = function(info){
        return $http.post('/api/children', info)
    }
    let getOne = function(id){
        return $http.get('/api/children/' + id);
    }
    return {getAll, add, getOne}
})