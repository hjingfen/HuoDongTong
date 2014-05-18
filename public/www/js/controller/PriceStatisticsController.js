function PriceStatisticsController($scope,$navigate){
    $scope.go_bid_list = function(){
        $navigate.go("/bid_list");
    }
    $scope.go_price_result = function(){
        $navigate.go("/price_result");
    }

    $scope.counts = BidSignUp.counts();
    $scope.bid_name = BidSignUp.bid_name();
    $scope.prices_statistics = PriceProcess.price_statistics();
}

