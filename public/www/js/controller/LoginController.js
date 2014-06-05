function LoginController($scope,$navigate,$http){
    $scope.user_login = function(){
        $scope.user_name = $scope.user_name || '';
        $scope.password = $scope.password || '';
        $scope.login_tip = $scope.login_with_null = false;
        if ($scope.user_name == '' || $scope.password == '')
        {
            $scope.login_with_null = true;
            return;
        }
        var data = {user_name:$scope.user_name, password:$scope.password};
        $http.post('/phone_login',data).success(function(return_data){
           if(return_data=='true'){
               localStorage.setItem('current_user',$scope.user_name);
               $navigate.go('/list', "slide");
           }
           if(return_data=='false'){
               $scope.login_tip = true;
               $scope.user_name = '';
               $scope.password = '';
           }
        })
    }
}
