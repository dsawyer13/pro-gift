
'use strict';

// const loginPage =
//   '<div class="login">' +
//   '<form class="login-form">' +
//   '<fieldset>' +
//   '<legend>Log In</legend>' +
//   '<label for="username">Username</label>' +
//   '<input type="text" class="login-username" name="username" placeholder="Enter Username" required>' +
//   '<label for="password">Password</label>' +
//   '<input type="password" class="login-password" name="password" placeholder="Enter Password" required>' +
//   '<button type="submit" class="login-submit">Sign In</button>' +
//   '</fieldset>' +
//   '</form>' +
//   '</div>';





  function createAccount() {
    $('.signup-form').submit(function(e) {
      e.preventDefault();


      const formData = {
        username: $(e.currentTarget).find('.username').val(),
        password: $(e.currentTarget).find('.password').val(),
        firstName: $(e.currentTarget).find('.firstName').val(),
        lastName: $(e.currentTarget).find('.lastName').val()
      };

      $.ajax({
        method: 'POST',
        url: '/api/users',
        data: JSON.stringify(formData),
        success: function(data) {
          console.log(data);
        },
        dataType: 'json',
        contentType: 'application/json'
      })
      // $('.signup').css("display", "none");
      // $('.login').html(loginPage);
  });
}




$(function() {
  createAccount();

})
