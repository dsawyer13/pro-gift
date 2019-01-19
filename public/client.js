'use strict';

function createAccount() {
  $('signup-submit').click(function() {
    let username = $('.uname').val();
    let password = $('.pwd').val();
    let firstName = $('.firstName').val();
    let lastName = $('.lastName').val();
    let regData = {'username': username, 'password': password, 'firstName': firstName, 'lastName': lastName};
    $.ajax({
      method: 'POST',
      url: '/api/users',
      data: regData,
      success: function(regData){
        console.log(regData)
    }
  })
}

$(createAccount);
