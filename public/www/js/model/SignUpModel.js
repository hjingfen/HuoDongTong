function SignUp(){
}

SignUp.count = function(){
    var activity = JSON.parse(localStorage.getItem(localStorage.displayed_activity));
    localStorage.sign_up_count = activity['applicants'].length;
    return activity['applicants'].length;
}

SignUp.applicants = function(){
    var activity = JSON.parse(localStorage.getItem(localStorage.displayed_activity));
    return activity['applicants'];
}

SignUp.Is_button_disabled = function(){
    return (localStorage.started_activity != localStorage.displayed_activity && localStorage.started_activity) || localStorage.started_bid_activity;
}

SignUp.get_status = function(){
    var activity = JSON.parse(localStorage.getItem(localStorage.displayed_activity));
    return activity.status;
}

SignUp.end_sign_up = function(){
    var activity_name = localStorage.displayed_activity
    var activity = JSON.parse(localStorage.getItem(activity_name));
    activity.status = 'end';
    localStorage.ended_activity = localStorage.started_activity;
    localStorage.started_activity = '';
    localStorage.setItem(activity_name, JSON.stringify(activity));
}

SignUp.start_sign_up = function(){
    var activity_name = localStorage.displayed_activity
    var activity = JSON.parse(localStorage.getItem(activity_name));
    activity.status = 'start';
    localStorage.started_activity = activity_name;
    localStorage.setItem(activity_name, JSON.stringify(activity));
}