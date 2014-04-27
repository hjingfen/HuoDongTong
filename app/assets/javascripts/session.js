function check_form() {
    var empty_inputs = _.select($('input'),function (el) {
        return $(el).val() == '';
    });
    if(empty_inputs.length == 0){
        return true
    }else{
        $('#error_alert').show();
        return false;
    }
}