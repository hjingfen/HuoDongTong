function LoginController($scope,$navigate){
    $scope.user_login = function(){
        $.ajax({
            url:'/phone_login',
            type:'POST',
            data:{user_name:$scope.user_name, password:$scope.password},
            success: function() {
                $navigate.go('/list')
            },
            error:function(){
                $scope.login_tip = true;
            }
        });
    }
}
