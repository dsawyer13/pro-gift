'use strict';

function createAccount() {
  $('.signup-form').on('submit', 'signup-button', function(event) {
    event.preventDefault();

    // let username = $('.uname').val();
    // let password = $('.pwd').val();
    // let firstName = $('.firstName').val();
    // let lastName = $('.lastName').val();
    // let regData = {'username': username, 'password': password, 'firstName': firstName, 'lastName': lastName};
    $.ajax({
      type: 'POST',
      url: '/api/users',
      data: $('.signup-form').serialize(),

    }).done(response => {
      console.log(response)
    })
  })
}

$(createAccount);
