//function BidActivity(){
//    this.status = 'un_start';
//    this.bid_applicants = [];
//}
//
//BidActivity.save_bid_activity = function(){
//    var activity_name = localStorage.getItem('ended_activity');
//    var activity = JSON.parse(localStorage.getItem(localStorage.ended_activity));
//    var new_bidding_names = activity_name+"竞价"+(parseInt(activity['bidding_names'].length)+1);
//    activity['bidding_names'].unshift(new_bidding_names);
//    localStorage.setItem(localStorage.ended_activity, JSON.stringify(activity));
//    localStorage.displayed_bid_activity = new_bidding_names;
//    var bid = new BidActivity();
//    localStorage.setItem(new_bidding_names,JSON.stringify(bid));
//}
//
//BidActivity.Is_continue_sign_up = function(){
//    return localStorage.started_bid_activity == '';
//}
//
//BidActivity.continue = function(){
//    var activity = JSON.parse(localStorage.getItem(localStorage.ended_activity));
//    activity.status = 'continue';
//    localStorage.setItem(localStorage.ended_activity,JSON.stringify(activity));
//}
//
//BidActivity.can_not_create_bid_activity = function(){
//    return localStorage.started_bid_activity || localStorage.sign_up_count == 0 || localStorage.started_activity;
//}
//
//BidActivity.bidding_names = function(){
//    return JSON.parse(localStorage.getItem(localStorage.ended_activity))['bidding_names'] || '';
//}
//
//BidActivity.save_displayed_bid_activity = function(bidding_name){
//    localStorage.setItem('displayed_bid_activity',bidding_name);
//}