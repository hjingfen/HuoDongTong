function SignUp(name,phone){
    this.name = name;
    this.phone = phone;
}

SignUp.current_sign_up = function(){
    var sign_ups = JSON.parse(localStorage.sign_ups);
    var activity_name = localStorage.displayed_activity;
    var user_name = localStorage.current_user;
    return _.find(sign_ups,function(sign_up){
        return sign_up.user_name == user_name && sign_up.activity_name == activity_name;
    })
}

SignUp.count = function(){
    var current_sign_up = SignUp.current_sign_up();
    localStorage.setItem('sign_up_count',current_sign_up.applicants.length);
    return current_sign_up.applicants.length;
}

SignUp.applicants = function(){
    var current_sign_up = SignUp.current_sign_up();
    return current_sign_up.applicants;
}

SignUp.Is_button_disabled = function(){
    return (localStorage.started_activity != localStorage.displayed_activity && localStorage.started_activity) || localStorage.started_bid_activity;
}

SignUp.get_status = function(){
    var current_sign_up = SignUp.current_sign_up();
    return current_sign_up.status;
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

SignUp.save_applicants = function(json_message){
    var applicant = SignUp.sms(json_message);
    var sign_ups = JSON.parse(localStorage.sign_ups);
    var activity_name = localStorage.displayed_activity;
    var user_name = localStorage.current_user;
    _.find(sign_ups,function(sign_up){
        sign_up.user_name == user_name && sign_up.activity_name == activity_name ? sign_up.applicants.unshift(applicant):'';
    })
    localStorage.setItem('sign_ups',JSON.stringify(sign_ups));
}

SignUp.sms = function(json_message){
    var name = json_message.messages[0].message.replace(/\s||\S/g,'').toLocaleLowerCase().replace(/^bm/,'');
    var phone = json_message.messages[0].phone;
    var applicant = new SignUp(name,phone);
    return applicant;
}

SignUp.process_sign_up_sms = function(json_message){
    var phone = json_message.messages[0].phone;
    var is_sign_up = SignUp.is_sign_up(json_message);
    if(SignUp.get_status() == 'start'){
        if(is_sign_up){
            SignUp.save_applicants(json_message)
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

SignUp.is_sign_up = function(json_message){
    var applicant = SignUp.sms(json_message)
    var sign_up = SignUp.current_sign_up();
    return (_.find(sign_up.applicants,function(app){
        return app.phone == applicant.phone}) == undefined) && sign_up.status == 'start';
}