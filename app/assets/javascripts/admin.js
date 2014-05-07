function save_password(user_id) {
    if($(':password:eq(0)').val() != $(':password:eq(1)').val()){
        $('#error_alert').show().find('p').text('两次密码输入不一致,请重新输入！');
        $(':password').val('');
        return false;
    }

    $.ajax({
        url:'save_password',
        type:'POST',
        data:{id:user_id, password:$(':password:eq(0)').val() },
        success: function() {
            $('#alert').modal()
        }
    });
}