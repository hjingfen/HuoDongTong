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