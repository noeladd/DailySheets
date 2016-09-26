app.config(function ($stateProvider){
    $stateProvider.state('children', {
        url: '/children',
        templateUrl: 'js/children/children.html',
        controller: 'ChildrenCtrl',
        resolve: {
            children: function(ChildrenFactory){
                return ChildrenFactory.getAll();
            }
        }
    });
})