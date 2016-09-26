app.config(function ($stateProvider){
    $stateProvider.state('messages', {
        url: '/messages',
        templateUrl: 'js/messages/messages.html',
        controller: 'MessageCtrl'
    });
});

app.controller('MessageCtrl', function($scope, MessageFactory, AuthService){
    let cachedMessages = [];
        return AuthService.getLoggedInUser()
        .then(function (user) {
            MessageFactory.getAllTo(user.id)
            .then(function (messages){
                cachedMessages.push(messages);
                MessageFactory.getAllFrom($scope.user.id)
                .then(function(messagesFrom){
                    cachedMessages.push(messagesFrom);
                    $scope.messages = cachedMessages
                    })
                })
            })
            .catch(function() {
                $scope.error = 'Message Error'
            })
 })


app.factory('MessageFactory', function($http){
    var getAllTo = function(id){
       return $http.get('/api/messages/to/' + id)
    }
    var getAllFrom = function(){
       return $http.get('/api/messages/from/' + id)
    }
    return {getAllTo, getAllFrom}
})