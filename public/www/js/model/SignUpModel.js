function SignUp(name,phone){
    this.name = name;
    this.phone = phone;
}

SignUp.count = function(){
    var sign_ups = JSON.parse(localStorage.sign_ups);
    var activity_name = localStorage.displayed_activity;
    var user_name = localStorage.current_user;
    var current_applicants = _.find(sign_ups,function(sign_up){
        return sign_up.user_name == user_name && sign_up.activity_name == activity_name;
    })
    return current_applicants.applicants.length;
}

SignUp.applicants = function(){
    var sign_ups = JSON.parse(localStorage.sign_ups);
    var activity_name = localStorage.displayed_activity;
    var user_name = localStorage.current_user;
    var current_applicants = _.find(sign_ups,function(sign_up){
        return sign_up.user_name == user_name && sign_up.activity_name == activity_name;
    })
    return current_applicants.applicants;
}

SignUp.Is_button_disabled = function(){
    return (localStorage.started_activity != localStorage.displayed_activity && localStorage.started_activity) || localStorage.started_bid_activity;
}

SignUp.get_status = function(){
    var sign_ups = JSON.parse(localStorage.sign_ups);
    var activity_name = localStorage.displayed_activity;
    var user_name = localStorage.current_user;
    var current_applicants = _.find(sign_ups,function(sign_up){
        return sign_up.user_name == user_name && sign_up.activity_name == activity_name;
    })
    return current_applicants.status;
}

SignUp.end_sign_up = function(){
    var sign_ups = JSON.parse(localStorage.sign_ups);
    var activity_name = localStorage.displayed_activity;
    var user_name = localStorage.current_user;
    _.find(sign_ups,function(sign_up){
        sign_up.status = sign_up.user_name == user_name && sign_up.activity_name == activity_name ? 'end':sign_up.status;
    })
    localStorage.ended_activity = localStorage.started_activity;
    localStorage.started_activity = '';
    localStorage.setItem('sign_ups',JSON.stringify(sign_ups));
}

SignUp.start_sign_up = function(){
    var sign_ups = JSON.parse(localStorage.sign_ups);
    var activity_name = localStorage.displayed_activity;
    var user_name = localStorage.current_user;
    _.find(sign_ups,function(sign_up){
        sign_up.status = sign_up.user_name == user_name && sign_up.activity_name == activity_name ? 'start':sign_up.status;
    })
    localStorage.started_activity = activity_name;
    localStorage.setItem('sign_ups',JSON.stringify(sign_ups));
}

SignUp.process_sign_up_sms = function(json_message){
    var sign_ups = JSON.parse(localStorage.sign_ups);
    var activity_name = localStorage.displayed_activity;
    var user_name = localStorage.current_user;
    var applicant = SignUp.sms(json_message);
    var phone = json_message.messages[0].phone;
    var sign_up = _.find(sign_ups,function(s){
        return s.user_name == user_name && s.activity_name == activity_name;
    })
    var is_sign_up = SignUp.is_sign_up(sign_up,applicant);
    if(SignUp.get_status() == 'start'){
        if(is_sign_up){
            _.find(sign_ups,function(sign_up){
                sign_up.user_name == user_name && sign_up.activity_name == activity_name ? sign_up.applicants.unshift(applicant):'';
            })
            localStorage.setItem('sign_ups',JSON.stringify(sign_ups));
            AfterReceiveSms1.run_after_apply();
            native_accessor.send_sms(phone,'恭喜您报名成功！');
            return;
        }
        native_accessor.send_sms(phone,'您已报名成功，请勿重复报名！');
    }
    if(SignUp.get_status() == 'un_start'|| SignUp.get_status() == 'continue'){
        native_accessor.send_sms(phone,"活动尚未开始，请稍后！")
    }
    if(SignUp.get_status() == 'end'){
        native_accessor.send_sms(phone,"抱歉！活动已结束。")
    }
}

SignUp.sms = function(json_message){
    var name = json_message.messages[0].message.replace(/\s||\S/g,'').toLocaleLowerCase().replace(/^bm/,'');
    var phone = json_message.messages[0].phone;
    var applicant = new SignUp(name,phone);
    return applicant;
}
SignUp.is_sign_up = function(sign_up,applicant){
    return (_.find(sign_up.applicants,function(app){
        return app.phone == applicant.phone}) == undefined) && sign_up.status == 'start';
}