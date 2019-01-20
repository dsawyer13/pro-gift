
'use strict';



  function handleSignupSubmit() {

    $('.signup-form').submit(function(e) {
      e.preventDefault();

      createAccount({
        username: $(e.currentTarget).find('.username').val(),
        password: $(e.currentTarget).find('.password').val(),
        firstName: $(e.currentTarget).find('.firstName').val(),
        lastName: $(e.currentTarget).find('.lastName').val()
      });
    });
  }

  function createAccount(userInfo) {

    console.log(userInfo);

    $.ajax({
      method: 'POST',
      url: '/api/users',
      data: JSON.stringify(data),
      success: function(data) {
        console.log(data)
      },
      dataType: 'json',
      contentType: 'application/json'
    })
    });
  )}



$(function() {
  handleSignupSubmit();
  createAccount();

})
