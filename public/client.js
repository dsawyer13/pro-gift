
'use strict';



  // function createUser() {
  //   $('.signup-form').on('submit', '.signup-submit', function(event) {
  //
  //     event.preventDefault();
  //
  //     let formData = {
  //       username: $('.username').val(),
  //       password: $('.password').val(),
  //       firstName: $('.firstName').val(),
  //       lastName: $('.lastName').val()
  //     };
  //
  //     $.ajax({
  //       type: 'POST',
  //       url: '/api/users',
  //       data: JSON.stringify(formData),
  //       dataType: 'json',
  //       contentType: 'application/json',
  //       success: function(data){
  //         $('.test').html("<p>" +
  //       data.username + "</p>");
  //     },
  //     error: function(e) {
  //       alert("Error")
  //       console.log("Error: ", e);
  //     }
  //   });
  // }

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
    });)
  }

$(function() {
  handleSignupSubmit();
  createAccount();

})
