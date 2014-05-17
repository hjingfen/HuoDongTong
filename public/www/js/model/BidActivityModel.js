function BidActivity(){
    this.status = 'un_start';
    this.biddings = [];
    this.user_name = localStorage.current_user;
    this.activity_name = localStorage.ended_activity;
}

BidActivity.save_bid_activity = function(){
    var bids = JSON.parse(localStorage.bids);
    var bid = new BidActivity;
    bid['name'] = "竞价"+(bids.length+1);
    bids.push(bid);
    localStorage.setItem('bids',JSON.stringify(bids));
}

BidActivity.Is_continue_sign_up = function(){
    return localStorage.started_bid_activity == '';
}

BidActivity.continue = function(){
    var sign_ups = JSON.parse(localStorage.sign_ups);
    var user_name = localStorage.current_user;
    var activity_name = localStorage.displayed_activity;
    _.find(sign_ups,function(sign_up){
        return sign_up.status = sign_up.user_name == user_name && sign_up.activity_name == activity_name ? 'continue' : sign_up.status;
    })
    localStorage.setItem('sign_ups',JSON.stringify(sign_ups));
}

BidActivity.can_not_create_bid_activity = function(){
    return localStorage.started_bid_activity || localStorage.getItem('sign_up_count') == 0 || localStorage.started_activity;
}

BidActivity.bidding_names = function(){
    var bids = JSON.parse(localStorage.bids);
    var user_name = localStorage.current_user;
    var activity_name = localStorage.displayed_activity;
    var current_activity = _.filter(bids,function(bid){
        return bid.user_name == user_name && bid.activity_name == activity_name;
    })
    return _.map(current_activity,function(c){
        return c.name;
    })
}

BidActivity.save_displayed_bid_activity = function(bidding_name){
    localStorage.setItem('displayed_bid_activity',bidding_name);
}