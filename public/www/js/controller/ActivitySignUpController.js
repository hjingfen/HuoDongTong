//function ActivitySignUpController($scope,$navigate){
//    $scope.get_applicant = function() {
//        $scope.count = SignUp.count();
//        $scope.applicants = SignUp.applicants();
//    }
//    $scope.get_applicant();
//
//    var status_do = {
//        'un_start':function(){
//            $scope.start_end = 'start';
//            $scope.button_disabled = SignUp.Is_button_disabled();
//        },
//        'continue':function(){
//            $scope.start_end = 'start';
//            $scope.button_disabled = SignUp.Is_button_disabled();
//        },
//        'start':function(){
//            $scope.start_end = 'end';
//            $scope.button_disabled = false;
//        },
//        'end':function(){
//            $scope.start_end = 'end'
//            $scope.button_disabled = true;
//        }
//    }
//    status_do[SignUp.get_status()]();
//
//    $scope.go_list=function(){
//        $navigate.go('/list');
//    }
//
//    $scope.start_activity_sign_up = function(){
//        SignUp.start_sign_up();
//        $scope.button_disabled = SignUp.Is_button_disabled();
//        $scope.start_end = 'end';
//    }
//
//    $scope.end_activity_sign_up = function(){
//        if(confirm(("是否要结束活动报名？"))){
//            SignUp.end_sign_up();
//            $navigate.go('/bid_list');
//        }
//    }
//
//    AfterReceiveSms1.regist(function () {
//        $scope.$apply($scope.get_applicant);
//    });
//
//    $scope.go_bid_list = function(){
//        localStorage.ended_activity = localStorage.ended_activity || '';
//        if(localStorage.ended_activity != ''){
//            $navigate.go('/bid_list');
//        }
//    }
//}