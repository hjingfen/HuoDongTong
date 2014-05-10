function CreateActivityController($scope, $navigate) {
    $scope.init_data = function(){
        $scope.listen_text();
        $scope.return_show = Activity.return_show();
    }

    $scope.click_create = function(){
        if(Activity.check($scope.activity_name)){
            $scope.tip = true;
            return;
        }
        Activity.save($scope.activity_name);
//        $navigate.go('/sign_up');
        $navigate.go('/list');
    }

    $scope.listen_text = function () {
        $scope.button_disabled = $scope.activity_name == null;
    }

    $scope.init_data();

    $scope.go_list = function(){
        $navigate.go('/list');
    }
}