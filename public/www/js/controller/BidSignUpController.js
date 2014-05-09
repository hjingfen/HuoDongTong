function BidSignUpController($scope,$navigate){
    $scope.go_bid_list=function(){
        $navigate.go('/bid_list');
    }

    $scope.bid_name = BidSignUp.bid_name();

    $scope.get_bid_applicant = function(){
        $scope.counts = BidSignUp.counts();
        $scope.bid_applicants = BidSignUp.bid_applicants();
    }
    $scope.get_bid_applicant();

    var bid_status_do = {
        'un_start':function(){
            $scope.start_end = 'start';
            $scope.button_disabled = BidSignUp.Is_button_disabled();
        },
        'start':function(){
            $scope.start_end = 'end';
            $scope.button_disabled = false;
        },
        'end':function(){
            $scope.start_end = 'end';
            $scope.button_disabled = true;
        }
    }
    bid_status_do[BidSignUp.get_bid_status()]();

    $scope.start_bid_sign_up = function(){
        $scope.start_end = 'end';
        BidSignUp.start_bid_sign_up();
    }

    $scope.end_bid_sign_up = function(){
        if(confirm('确认要结束本次竞价吗？')){
            BidSignUp.end_bid_sign_up();
            $navigate.go('/price_result');
        }
    }

    AfterReceiveSms2.regist(function () {
        $scope.$apply($scope.get_bid_applicant());
    });
}
