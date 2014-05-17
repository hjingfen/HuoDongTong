function ActivityListController($scope,$navigate){
    $scope.go_create = function(){
        $navigate.go('/create');
    }

    $scope.go_sign_up = function(activity_name){
        Activity.save_displayed_activity(activity_name)
        $navigate.go('/sign_up');
    }

    $scope.activity_names = Activity.names();

    $scope.button_disabled = Activity.Is_button_disabled();

    if($scope.activity_names.length == 0){
        $navigate.go('/create');
    }

    $scope.synchronize = function(){

    }
}