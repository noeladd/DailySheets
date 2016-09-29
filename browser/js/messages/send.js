app.config(function($stateProvider){
    $stateProvider.state('send', {
        url: '/messages/send',
        templateUrl: 'js/messages/send.html',
        controller: 'SendCtrl'
    })
});

app.controller('SendCtrl', function ($scope, MessageFactory){
    $scope.message = {};
    MessageFactory.getUser()
    .then(function(user){
        $scope.user = user;
        $scope.message.fromId = user.id
        if ($scope.user.isParent){
        MessageFactory.getAllStaff()
        .then(function(users){
            $scope.toUsers = users.data
        })
        } else {
        MessageFactory.getAllUsers()
            .then(function(users){
                $scope.toUsers = users.data
                console.log($scope.toUsers)
        })
    }
    });
    
    
    
    $scope.send = MessageFactory.send

})