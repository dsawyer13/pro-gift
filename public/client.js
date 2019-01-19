
'use strict';

$(document).ready(function() {

  $('.signup-form').submit(function(event) {
    event.preventDefault();
    ajaxPost();
  });

  function ajaxPost() {

      let formData = {
        username: $('.username').val(),
        password: $('.password').val(),
        firstName: $('.firstName').val(),
        lastName: $('.lastName').val()
      };
      $.ajax({
        type: 'POST',
        url: '/api/users',
        data: JSON.stringify(formData),
        dataType: 'json',
        contenType: 'application/json',
        success: function(data){
          $('.test').html("<p>" +
        data.username + "</p>");
      },
      error: function(e) {
        alert("Error")
        console.log("Error: ", e);
      }
    });
  }

})
