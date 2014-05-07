function check_form() {
    var empty_inputs = _.select($('input'),function (el) {
        return $(el).val() == '';
    });
    if(empty_inputs.length == 0){
        if($(':password:eq(0)').val() != $(':password:eq(1)').val()){
            $('#error_alert').show().find('p').text('两次密码输入不一致,请重新输入！');
            $(':password').val('');
            return false;
        }
        return true;
    }else{
        $('#error_alert').show().find('p').text('请将注册信息填写完整！');
        return false;
    }
}

function check_password(){
    if($(':password:eq(0)').val() != $(':password:eq(1)').val()){
        $('#password_error_alert').show().find('p').text('两次密码输入不一致,请重新输入！');
        $(':password').val('');
        return false;
    }
    else{
        return true;
    }
}