app.config(function($stateProvider){
    $stateProvider.state('message', {
        url:'/messages/:id',
        templateUrl: 'js/messages/message.html',
        controller: 'MessageCtrl',
        resolve: {
            message: function(MessageFactory, $stateParams){
               return MessageFactory.getOne($stateParams.id)
            }
        }
    })
});

app.controller('MessageCtrl', function($scope, message, MessageFactory){
    $scope.message = message.data;
    MessageFactory.getUserById(message.data.fromId)
    .then(function(user){
        console.log(user.data)
        $scope.from = user.data.name
    })
    MessageFactory.getUserById(message.data.toId)
    .then(function(user){
        $scope.to = user.data.name
    })
});
