'use strict';

function createAccount() {
  $('signup-submit').on('submit', function(event) {
    event.preventDefault();

    // let username = $('.uname').val();
    // let password = $('.pwd').val();
    // let firstName = $('.firstName').val();
    // let lastName = $('.lastName').val();
    // let regData = {'username': username, 'password': password, 'firstName': firstName, 'lastName': lastName};
    $.ajax({
      type: 'POST',
      url: '/api/users',
      data: $('form').serialize(),
      success: function(){
        alert('form was submitted')
    }
  })
}

$(createAccount);
