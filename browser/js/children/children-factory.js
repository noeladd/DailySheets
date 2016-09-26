app.factory('ChildrenFactory', function($http){
    let getAll = function(){
        return $http.get('/api/children')
        .then(function(response){
            return response.data;
        })
    }
})