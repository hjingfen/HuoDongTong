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

