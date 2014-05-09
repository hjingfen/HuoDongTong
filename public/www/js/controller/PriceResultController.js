function PriceResultController($scope,$navigate,$timeout){
    $scope.go_bid_list = function(){
        $navigate.go('/bid_list')
    }

    $scope.go_price_statistics = function(){
        $navigate.go('/price_statistics')
    }

    $scope.bid_name = PriceProcess.bid_name();
    $scope.counts = PriceProcess.counts();
    $scope.bid_applicants = PriceProcess.sort_bid_applicants();

    $scope.show_result = function () {
        if (PriceProcess.to_be_winner().length != 0) {
           $scope.winner = PriceProcess.winner();
            $timeout(function () {
                $('#bid_success').modal('show');
                $scope.show_success = true;
                $timeout(function () {
                    $('#bid_success').modal('hide');
        }, 3000);
    }, 1);
        }
        if(PriceProcess.to_be_winner().length == 0){
            $timeout(function () {
                $scope.show_fail = 'true';
                $('#bid_fail').modal('show');
                $timeout(function () {
                    $('#bid_fail').modal('hide');
                }, 3000);
            }, 1);
        }
    }
    $scope.show_result();
}