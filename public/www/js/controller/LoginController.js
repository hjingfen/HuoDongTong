function LoginController($scope,$navigate){
    $scope.user_login = function(){
        $.ajax({
            url:'/phone_login',
            type:'POST',
            data:{user_name:$scope.user_name, password:$scope.password},
            success: function() {
                localStorage.setItem('current_user',$scope.user_name);
                $navigate.go('/list');
            },
            error:function(){
                $scope.login_tip = true;
            }
        });
    }
}
