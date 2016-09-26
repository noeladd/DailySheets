app.config(function ($stateProvider){
    $stateProvider.state('messages', {
        url: '/messages',
        templateUrl: 'js/messages/messages.html',
        controller: 'MessagesCtrl'
    });
});

app.controller('MessagesCtrl', function($scope, MessageFactory){
    let cachedMessages = [];
       MessageFactory.getUser()
        .then(function (user) {
            $scope.user = user
            MessageFactory.getAllTo($scope.user.id)
            .then(function (messages){
                messages.data.forEach(function(message){
                    cachedMessages.push(message)
                })
                MessageFactory.getAllFrom($scope.user.id)
                .then(function(messagesFrom){
                    console.log(messagesFrom)
                    messagesFrom.data.forEach(function(message){
                    cachedMessages.push(message)
                })
                    $scope.messages = cachedMessages
                    })
                })
            })
            .catch(function() {
                $scope.error = 'Message Error'
            })
 })


app.factory('MessageFactory', function($http, AuthService, $state){
    var getUser = function(){
        return AuthService.getLoggedInUser()
    }
    var getAllStaff = function(){
        return $http.get('/api/users/staff')
    }
    var getAllUsers = function(){
        return $http.get('/api/users')
    }
    var getUserById = function(id){
        return $http.get('/api/users/'+ id)
    }
    var getAllTo = function(id){
       return $http.get('/api/messages/to/' + id)
    }
    var getAllFrom = function(id){
       return $http.get('/api/messages/from/' + id)
    }
    var send = function(messageInfo){
        return $http.post('/api/messages', messageInfo)
        .then(function(){
            $state.go('messages')
        })
    }
    var getOne = function(id){
        return $http.get('/api/messages/' + id)
    }
    return {getAllTo, getAllFrom, getUser, getAllUsers, send, getAllStaff, getOne, getUserById}
})