//myModule.config(function($routeProvider) {


    //routing generate

    //manual routing
//});

myModule.config(function($routeProvider) {
    $routeProvider.when("/", {
        templateUrl: "pages/login_page.html",
        controller: LoginController
    }).when("/list", {
        templateUrl: "pages/activity_list_page.html",
        controller: ActivityListController
    }).when("/create", {
        templateUrl: "pages/create_activity_page.html",
        controller: CreateActivityController
    }).when("/sign_up", {
        templateUrl: "pages/activity_sign_up_page.html",
        controller: ActivitySignUpController
    }).when("/bid_list", {
        templateUrl:"pages/bid_list_page.html",
        controller:BidListController
    })


//    }).when("/bid_sign_up", {
//            templateUrl:"pages/bid_sign_up_page.html",
//            controller:BidSignUpController
//    }).when("/price_result", {
//            templateUrl:"pages/price_result_page.html",
//            controller:PriceResultController
//    }).when("/price_statistics", {
//            templateUrl:"pages/price_statistics_page.html",
//            controller:PriceStatisticsController
//        })

//        .otherwise({
//            redirectTo: "/"
//        });
});
/** Here is example
myModule.config(function($routeProvider) {
    $routeProvider.when("/", {
        templateUrl: "pages/activity_list_page.html",
        controller: ActivityListController
    }).when("/activity/create", {
            templateUrl: "pages/activity_create_page.html",
            controller: ActivityCreateController
        }).when("/sign_ups/list/:activity_name", {
            templateUrl: "pages/apply_page.html",
            controller: SignUpListController
        }).otherwise({
            redirectTo: "/"
        });
});
**/
//function a() {
//
//}
