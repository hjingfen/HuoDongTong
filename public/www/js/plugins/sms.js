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
        var first_two_characters = json_message.messages[0].message.substr(0,2);
        var judge_sms = {
            bm: function () {
                SignUp.process_sign_up_sms(json_message);
            },
            jj:function(){
                BidSignUp.process_bidding_sms(json_message);
            }
        }
        if (judge_sms[first_two_characters]) {
            judge_sms[first_two_characters]();
        }
    }
}

function notify_message_received(message_json) {
//    console.log(JSON.stringify(message_json));
    //alert(JSON.stringify(message_json.messages));
    native_accessor.receive_message(message_json);
}
//phone_number=message_json.messages[0].ph