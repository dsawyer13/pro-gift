
'use strict';

const loginPage =
  '<div class="login">' +
  '<form class="login-form">' +
  '<fieldset>' +
  '<legend>Log In</legend>' +
  '<label for="username">Username</label>' +
  '<input type="text" class="login-username" name="username" placeholder="Enter Username" required>' +
  '<label for="password">Password</label>' +
  '<input type="password" class="login-password" name="password" placeholder="Enter Password" required>' +
  '<button type="submit" class="login-submit">Sign In</button>' +
  '</fieldset>' +
  '</form>' +
  '</div>';





function createAccount() {
  $('.signup-form').submit(function(e) {
    e.preventDefault();

    //pull data from forms
    const formData = {
      username: $(e.currentTarget).find('.username').val(),
      password: $(e.currentTarget).find('.password').val(),
      firstName: $(e.currentTarget).find('.firstName').val(),
      lastName: $(e.currentTarget).find('.lastName').val()
      };

    const loginData = {
      username: $(e.currentTarget).find('.username').val(),
      password: $(e.currentTarget).find('.password').val()
    };
    //post user info to DB
    $.ajax({
      method: 'POST',
      url: '/api/users',
      data: JSON.stringify(formData),
      success: function(data) {
        console.log(data);
        //on success, use username/pass to get token
        $.ajax({
          method: 'POST',
          url: '/api/auth/login',
          data: JSON.stringify(loginData),
          success: function(data) {
            console.log(data);
            authenticateUser(data);
          },
          dataType: 'json',
          contentType: 'application/json'
        });

      },
      dataType: 'json',
      contentType: 'application/json'
    })

  });
}


function authenticateUser(data) {
  //store token in localStorage and put it in header for GET request
  const token = data[0];
  localStorage.setItem('token', token);

  $.ajax({
    method: 'GET',
    url: '/api/protected',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    dataType: 'json',
    contentType: 'application/json'
  });
}

function accessLogin() {
  //switch to login form on click of Log In link
  $('.access-login').on('click', function(e) {
    $('.container').html(loginPage);
  })
}



$(function() {
  createAccount();

})
