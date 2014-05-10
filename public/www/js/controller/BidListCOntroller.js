//function BidListController($scope,$navigate){
//    $scope.go_list = function(){
//        $navigate.go('/list');
//    }
//
//    $scope.button_disabled = BidActivity.can_not_create_bid_activity();
//
//    $scope.go_sign_up = function(){
//        if(BidActivity.Is_continue_sign_up()){
//            BidActivity.continue();
//            $navigate.go('/sign_up')
//        }
//    }
//
//    $scope.create_bid_activity = function(){
//        BidActivity.save_bid_activity();
//        $navigate.go('/bid_sign_up');
//    }
//
//    $scope.bidding_names = BidActivity.bidding_names();
//
//    $scope.go_bid_sign_up = function(bidding_name){
//        BidActivity.save_displayed_bid_activity(bidding_name);
//        $navigate.go('/bid_sign_up');
//    }
//}