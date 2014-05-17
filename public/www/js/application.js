var myModule = angular.module('myApp', ['mobile-navigate']);

myModule.run(function($route, $http, $templateCache) {
    angular.forEach($route.routes, function(r) {
        if (r.templateUrl) {
            $http.get(r.templateUrl, {cache: $templateCache});
        }
    });
});

myModule.controller('MainCtrl', function($scope, $navigate) {
    $scope.$navigate = $navigate;
});

myModule.directive('ngTap', function() {
    var isTouchDevice = !!("ontouchstart" in window);
    return function(scope, elm, attrs) {
        if (isTouchDevice) {
            var tapping = false;
            elm.bind('touchstart', function() { tapping = true; });
            elm.bind('touchmove', function() { tapping = false; });
            elm.bind('touchend', function() {
                tapping && scope.$apply(attrs.ngTap);
            });
        } else {
            elm.bind('click', function() {
                scope.$apply(attrs.ngTap);
            });
        }
    };
});

var native_access;
$(document).ready(function () {
    localStorage.actity_ids = localStorage.actity_ids || "[]";
    localStorage.activities = localStorage.activities || "[]";
    localStorage.sign_ups = localStorage.sign_ups || "[]";
    localStorage.bids = localStorage.bids || "[]";
    localStorage.biddings = localStorage.biddings || "[]";
    localStorage.ended_activity = localStorage.ended_activity || '';

    localStorage.started_activity = localStorage.started_activity || '';
    localStorage.started_bid_activity = localStorage.started_bid_activity || '';
    localStorage.bidding_started_activity = localStorage.bidding_started_activity || '';

});

myModule.filter('background1', function () {
    return function (activity_name) {
        var color = ((activity_name == localStorage.started_activity) || (activity_name == localStorage.bidding_started_activity)) ? 'yellow':'';
        return 'background : ' + color;
    };
});

myModule.filter('background2', function () {
    return function (bidding_name) {
        var color = bidding_name == localStorage.started_bid_activity ? 'yellow' : '';
        return 'background : ' + color;
    };
});
