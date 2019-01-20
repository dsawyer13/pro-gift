
'use strict';



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
          console.log(data)
        },
        dataType: 'json',
        contentType: 'application/json'
      })
  })};




$(function() {
  createAccount();

})
