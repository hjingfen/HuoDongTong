function ActivityListController($scope,$navigate,$http){
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
        var data = {activities:JSON.parse(localStorage.activities),sign_ups:JSON.parse(localStorage.sign_ups),bids:JSON.parse(localStorage.bids)};
        $http.post('/users/synchronize',data).success(function(){
            alert('同步成功！');
        })
        $http.post('/users/synchronize',data).error(function(){
            alert('同步失败，请重新同步！');
        })
    }
}