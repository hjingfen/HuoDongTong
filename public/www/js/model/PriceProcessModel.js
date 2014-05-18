function PriceProcess(){
}

PriceProcess.sort_bid_applicants = function(){
    var current_bid = BidSignUp.current_bid();
    var bid_applicants = current_bid.bid_applicants;
    return _.sortBy(bid_applicants,function(bid_applicant){
        return parseInt(bid_applicant.price);
    })
}

PriceProcess.to_be_winner = function(){
    var sort_bid_applicants = PriceProcess.sort_bid_applicants();
    var group_price = _.groupBy(sort_bid_applicants,function(s){return s.price});
    localStorage.setItem('prices_statistics_array',JSON.stringify(group_price));
    return _.filter(group_price,function(g){return g.length == 1})
}

PriceProcess.winner = function(){
    return _.first(PriceProcess.to_be_winner())[0];
}

PriceProcess.price_statistics = function(){
    var prices = JSON.parse(localStorage.getItem('prices_statistics_array'));
    return _.map(prices, function(value, key){
        var price_statistics = {};
        price_statistics['price'] = key;
        price_statistics['count'] = value.length;
        return price_statistics;
    });
}
