function BidSignUp(price,phone){
    this.phone = phone;
    this.price = price;
    this.name = '';
}

BidSignUp.bid_name = function(){
    return localStorage.displayed_bid_activity;
}

BidSignUp.counts = function(){
    var current_bid = BidSignUp.current_bid();
    return current_bid.bid_applicants.length;
}

BidSignUp.bid_applicants = function(){
    var current_bid = BidSignUp.current_bid();
    return current_bid.bid_applicants;
}

BidSignUp.current_bid = function(){
    var bids = JSON.parse(localStorage.bids);
    var activity_name = localStorage.displayed_activity;
    var bid_name = localStorage.displayed_bid_activity;
    return _.find(bids,function(bid){
        return bid.user_name == localStorage.current_user && bid.activity_name == activity_name && bid.name == bid_name;
    })
}

BidSignUp.get_bid_status = function(){
    var current_bid = BidSignUp.current_bid();
    return current_bid.status;
}

BidSignUp.Is_button_disabled = function(){
    return localStorage.started_bid_activity != localStorage.displayed_bid_activity && localStorage.started_bid_activity;
}

BidSignUp.current_bid_info = function(bids){
    var user_name = localStorage.current_user;
    var activity_name = localStorage.displayed_activity;
    var bid_name = localStorage.displayed_bid_activity;
    return _.find(bids,function(bid){
        return bid.user_name == user_name && bid.activity_name == activity_name && bid.name == bid_name;
    })

}

BidSignUp.end_bid_sign_up = function(){
    var bids = JSON.parse(localStorage.bids);
    var current_bid = BidSignUp.current_bid_info(bids);
    current_bid.status = 'end';
    localStorage.ended_bid_activity = localStorage.started_bid_activity;
    localStorage.started_bid_activity = '';
    localStorage.bidding_started_activity = '';
    localStorage.setItem('bids',JSON.stringify(bids));
}

BidSignUp.start_bid_sign_up = function(){
    var bids = JSON.parse(localStorage.bids);
    var current_bid = BidSignUp.current_bid_info(bids);
    current_bid.status = 'start';
    localStorage.started_bid_activity = current_bid.name;//开始的竞价活动
    localStorage.bidding_started_activity = localStorage.ended_activity;//开始竞价的活动
    localStorage.setItem('bids',JSON.stringify(bids));
    BidSignUp.synchronize();
}

BidSignUp.synchronize = function(){
    $.ajax({
        url:'/users/synchronize',
        type:'POST',
        data:{activities:Activity.user_index(),bid_list:Activity.bidding_list(),sign_up_list:Activity.sign_up_list(),bid_detail:Activity.bids()}
    })
}

BidSignUp.save_bid_applicant = function(json_message){
    var bid_applicant = BidSignUp.sms(json_message);
    var current_sign_up_applicants = SignUp.current_sign_up().applicants;
    var applicant = _.find(current_sign_up_applicants,function(applicants){
        return applicants.phone == bid_applicant.phone;
    })
    bid_applicant['name'] = applicant.name;
    var bids = JSON.parse(localStorage.bids);
    var current_bid = BidSignUp.current_bid_info(bids);
    current_bid.bid_applicants.push(bid_applicant);
    localStorage.setItem('bids',JSON.stringify(bids));
    AfterReceiveSms2.run_after_apply();
}

BidSignUp.sms = function(json_message){
    var price = json_message.messages[0].message.replace(/\s||\S/g,'').toLocaleLowerCase().replace(/^jj/,'');
    var phone = json_message.messages[0].phone;
    var bid_applicant = new BidSignUp(price,phone);
    return bid_applicant;
}

BidSignUp.had_sign_up = function(json_message){
    var bid_applicant = BidSignUp.sms(json_message);
    var current_sign_up_applicants = SignUp.current_sign_up().applicants;
    return _.find(current_sign_up_applicants,function(applicants){
        return applicants.phone == bid_applicant.phone;
    }) != undefined;
}

BidSignUp.no_repeat_bid_activity = function(json_message){
    var current_bid = BidSignUp.current_bid();
    var bid_applicant = BidSignUp.sms(json_message);
    return (_.find(current_bid.bid_applicants,function(app){
        return app.phone == bid_applicant.phone}) == undefined);
}

BidSignUp.process_bidding_sms = function(json_message){
    var phone = json_message.messages[0].phone;
    if(BidSignUp.had_sign_up(json_message)){
        if(BidSignUp.get_bid_status() == 'start'){
            if(BidSignUp.no_repeat_bid_activity(json_message)){
                BidSignUp.save_bid_applicant(json_message);
                native_accessor.send_sms(phone,'恭喜竞价成功！');
                return;
            }
            native_accessor.send_sms(phone,'您已竞价成功，请勿重复竞价！');
            return;
        }
        if(BidSignUp.get_bid_status() == 'un_start'){
            native_accessor.send_sms(phone,"竞价尚未开始，请稍后！");
            return;
        }
        if(BidSignUp.get_bid_status() == 'end'){
            native_accessor.send_sms(phone,'抱歉！活动已结束。')
        }
    }
    if(!(BidSignUp.had_sign_up(json_message))){
        native_accessor.send_sms(phone,'对不起！您没有报名此次活动。')
    }
}