function Activity(){
    this.status = 'un_start';
    this.applicants = [];
    this.bidding_names = [];
}

Activity.save = function(activity_name){
    var activities = JSON.parse(localStorage.getItem('activities')) || [];
    var activity = new Activity();
    activities.unshift(activity_name);
    localStorage.setItem('activities', JSON.stringify(activities));
    localStorage.setItem(activity_name,JSON.stringify(activity));
    localStorage.setItem('displayed_activity',activity_name);
}

Activity.check = function(activity_name){
    var activities = JSON.parse(localStorage.getItem('activities')) || [];
    return _.find(activities, function(activity){
        return activity == activity_name;
    }) ? true : false;
}

Activity.save_displayed_activity = function (activity) {
    localStorage.displayed_activity = activity;
}

Activity.names = function(){
    return JSON.parse(localStorage.getItem("activities")||'[]');
}

Activity.Is_button_disabled = function(){
    return localStorage.started_bid_activity;
}

Activity.return_show = function(){
    return localStorage.getItem('activities');
}

