function AfterReceiveSms() {
    this.methods = [];
    this.regist = function (method) {
        this.methods.push(method);
    };
    this.run_after_apply = function () {
        _.each(this.methods, function (method) {
            method();
        });
    };
}

var AfterReceiveSms1 = new AfterReceiveSms();
var AfterReceiveSms2 = new AfterReceiveSms();

function Process_received_message(){
}

Process_received_message.Is_bm = function(json_message){
    var applicant_name = json_message.messages[0].message.replace(/\s||\S/g,'').toLocaleLowerCase();
    return applicant_name.substr(0,2) == 'bm';
}

Process_received_message.started_activity = function(){
    return localStorage.started_activity;
}

Process_received_message.no_repeat_activity = function(json_message){
    var applicant_name = json_message.messages[0].message.replace(/\s||\S/g,'').toLocaleLowerCase();
    var applicants_name = applicant_name.replace(/^bm/,'');
    var app_phone = json_message.messages[0].phone;
    var activity = JSON.parse(localStorage.getItem(localStorage.started_activity));
    var applicant = {name:applicants_name,phone:app_phone};
    return (_.find(activity['applicants'],function(app){return app.phone == applicant.phone}) == undefined);
}

Process_received_message.save_applicant = function(json_message){
    var applicant_name = json_message.messages[0].message.replace(/\s||\S/g,'').toLocaleLowerCase();
    var applicants_name = applicant_name.replace(/^bm/,'');
    var app_phone = json_message.messages[0].phone;
    var activity = JSON.parse(localStorage.getItem(localStorage.started_activity));
    var applicant = {name:applicants_name,phone:app_phone};
    activity['applicants'].push(applicant);
    localStorage.setItem(localStorage.started_activity, JSON.stringify(activity));
    AfterReceiveSms1.run_after_apply();
}

Process_received_message.Is_JJ_num = function(json_message){
    var applicant_name = json_message.messages[0].message.replace(/\s||\S/g,'').toLocaleLowerCase();
    var num = applicant_name.substr(2,1);
    return applicant_name.substr(0,2) == 'jj' && !(isNaN(num))
}

Process_received_message.had_sign_up = function(json_message){
    var applicant_name = json_message.messages[0].message.replace(/\s||\S/g,'').toLocaleLowerCase();
    var app_phone = json_message.messages[0].phone;
    var bid_price = applicant_name.replace(/^jj/,'');
    var activity = JSON.parse(localStorage.getItem(localStorage.displayed_activity));
    var bid_applicant = {name:'',phone:app_phone,price:bid_price};
    return (_.find(activity['applicants'],function(act){return act.phone == bid_applicant.phone}) == undefined)
}

Process_received_message.no_repeat_bid_activity = function(json_message){
    var bid_activity = JSON.parse(localStorage.getItem(localStorage.started_bid_activity));
    var applicant_name = json_message.messages[0].message.replace(/\s||\S/g,'').toLocaleLowerCase();
    var app_phone = json_message.messages[0].phone;
    var bid_price = applicant_name.replace(/^jj/,'');
    var bid_applicant = {name:'',phone:app_phone,price:bid_price};
    return (_.find(bid_activity['bid_applicants'],function(bid_app){return bid_app.phone == bid_applicant.phone}) == undefined);

}

Process_received_message.save_bid_applicant = function(json_message){
    var activity = JSON.parse(localStorage.getItem(localStorage.displayed_activity));
    var bid_activity = JSON.parse(localStorage.getItem(localStorage.started_bid_activity));
    var applicant_name = json_message.messages[0].message.replace(/\s||\S/g,'').toLocaleLowerCase();
    var bid_price = applicant_name.replace(/^jj/,'');
    var app_phone = json_message.messages[0].phone;
    var bid_applicant = {name:'',phone:app_phone,price:bid_price};
    var applicant = _.find(activity['applicants'],function(act){return act.phone == bid_applicant.phone});
    bid_applicant.name = applicant.name;
    bid_activity['bid_applicants'].push(bid_applicant);
    localStorage.setItem(localStorage.started_bid_activity, JSON.stringify(bid_activity));
    AfterReceiveSms2.run_after_apply();
}
