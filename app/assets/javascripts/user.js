function login() {

    var user_name = $('#user_name').val();
    var password = $('#user_password').val();

    $.ajax({
        url:'',
        type:'POST',
        data:{ name:user_name, password:password },
        success: function (result) {

        },
        error: function (error) {

        }
    });
}