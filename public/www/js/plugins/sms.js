var native_accessor = {
    send_sms: function (phone, message) {
        console.log(phone,message)
//        native_access.send_sms({"receivers":[{"name":'name', "phone":phone}]}, {"message_content":message});
    },

    receive_message: function (json_message) {
        if (typeof this.process_received_message === 'function') {
            this.process_received_message(json_message);
        }
    },

    process_received_message:function(json_message){
        var phone = json_message.messages[0].phone;
        if(Process_received_message.Is_bm(json_message)){
            if(SignUp.get_status() == 'start'){
                if(Process_received_message.no_repeat_activity(json_message)){
                    Process_received_message.save_applicant(json_message);
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
        if(Process_received_message.Is_JJ_num(json_message)){
            if(!(Process_received_message.had_sign_up(json_message))){
                if(BidSignUp.get_bid_status() == 'start'){
                    if(Process_received_message.no_repeat_bid_activity(json_message)){
                        Process_received_message.save_bid_applicant(json_message);
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
            if(Process_received_message.had_sign_up(json_message)){
                native_accessor.send_sms(phone,'对不起！您没有报名此次活动。')
            }
        }
    }
}

function notify_message_received(message_json) {
//    console.log(JSON.stringify(message_json));
    //alert(JSON.stringify(message_json.messages));
    native_accessor.receive_message(message_json);
}
//phone_number=message_json.messages[0].ph