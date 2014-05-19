function Activity(activity_name){
    this.activity_name = activity_name;
}

Activity.save = function(activity_name){
    var activities = JSON.parse(localStorage.getItem('activities')) || [];
    var activity = new Activity(activity_name);
    activity['current_user'] = localStorage.current_user;
    localStorage.displayed_activity = activity_name;
    activities.push(activity);
    localStorage.setItem('activities',JSON.stringify(activities));
    Activity.create_sign_ups(activity_name);
}

Activity.create_sign_ups = function(activity_name){
    var sign_ups = JSON.parse(localStorage.getItem('sign_ups'));
    var sign_up = {};
    sign_up.status = 'un_start';
    sign_up.user_name = localStorage.current_user;
    sign_up.activity_name = activity_name;
    sign_up.applicants = [];
    sign_ups.unshift(sign_up);
    localStorage.setItem('sign_ups',JSON.stringify(sign_ups));
}

Activity.check = function(activity_name){
    var activities = JSON.parse(localStorage.getItem('activities')) || [];
    var current_user = localStorage.current_user;
    return _.find(activities, function(activity){
        return activity.current_user == current_user && activity.activity_name == activity_name;
    }) ? true : false;
}

Activity.save_displayed_activity = function (activity) {
    localStorage.displayed_activity = activity;
}

Activity.names = function(){
    var activities = JSON.parse(localStorage.getItem('activities')) || [];
    var current_user = localStorage.current_user;
    var activities_info = _.filter(activities,function(activity){
        return activity.current_user == current_user;
    })
    return _.map(activities_info,function(activity){
        return activity.activity_name;
    })
}

Activity.Is_button_disabled = function(){
    return localStorage.started_bid_activity;
}

Activity.return_show = function(){
    return localStorage.getItem('activities');
}

Activity.synchronize_to_service = function(){
    $.ajax({
        url:'/users/synchronize',
        type:'POST',
        data:{user:localStorage.current_user,activities:JSON.parse(localStorage.activities),sign_ups:JSON.parse(localStorage.sign_ups),bids:JSON.parse(localStorage.bids)},
        success: function () {
            alert('同步成功！');
        },
        error: function () {
            alert('同步失败，请重新同步！')
        }
    })
}
