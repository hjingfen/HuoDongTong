//function BidSignUp(){
//}
//
//BidSignUp.bid_name = function(){
//    return localStorage.displayed_bid_activity;
//}
//
//BidSignUp.counts = function(){
//    var bid_activity = JSON.parse(localStorage.getItem(localStorage.displayed_bid_activity));
//    return bid_activity['bid_applicants'].length;
//}
//
//BidSignUp.bid_applicants = function(){
//    var bid_activity = JSON.parse(localStorage.getItem(localStorage.displayed_bid_activity));
//    return bid_activity['bid_applicants'];
//}
//
//BidSignUp.get_bid_status = function(){
//    var bid_activity = JSON.parse(localStorage.getItem(localStorage.displayed_bid_activity));
//    return bid_activity.status;
//}
//
//BidSignUp.Is_button_disabled = function(){
//    return localStorage.started_bid_activity != localStorage.displayed_bid_activity && localStorage.started_bid_activity;
//}
//
//BidSignUp.end_bid_sign_up = function(){
//    var bid_activity_name = localStorage.displayed_bid_activity;
//    var bid_activity = JSON.parse(localStorage.getItem(bid_activity_name));
//    bid_activity.status = 'end';
//    localStorage.ended_bid_activity = localStorage.started_bid_activity;
//    localStorage.started_bid_activity = '';
//    localStorage.bidding_started_activity = '';
//    localStorage.setItem(bid_activity_name,JSON.stringify(bid_activity));
//}
//
//BidSignUp.start_bid_sign_up = function(){
//    var bid_activity_name = localStorage.displayed_bid_activity;
//    var bid_activity = JSON.parse(localStorage.getItem(bid_activity_name));
//    bid_activity.status = 'start';
//    localStorage.started_bid_activity = bid_activity_name;//开始的竞价活动
//    localStorage.bidding_started_activity = localStorage.ended_activity;//开始竞价的活动
//    localStorage.setItem(bid_activity_name,JSON.stringify(bid_activity));
//}