'use strict';

const loginForm = (
  '<form class="login-form">' +
  '<fieldset>' +
  '<legend>Log In</legend>' +
  '<label for="username">Username</label>' +
  '<input autocomplete="off" type="text" class="username" name="username" placeholder="Enter Username" required>' +
  '<label for="password">Password</label>' +
  '<input autocomplete="off" type="password" class="password" name="password" placeholder="Enter Password" required>' +
  '<button type="submit" class="form-submit">Log In</button>' +
  '</fieldset>' +
  '</form>'
);

const giftTemplate = (
  '<li class="gift">' +
    '<div class="gift-name"></div>'+
    '<div class="gift-price"></div>'+
    '<div class="buttons">' +
      '<button class="edit">Edit</button>' +
      '<button class="delete">Delete</button>' +
    '</div>' +
  '</li>'
);
const homePage = (
  '<h1 class="display-name"></h1>' +
  '<div class="list-container">' +
  '<ul class="gift-list"></ul>' +
  '<div class="gift-info">' +
  '<form>' +
  '<input type="text" class="gift-name" placeholder="Item Name" required>' +
  '<input type="text" class="gift-link" placeholder="Item Link">' +
  '<input type="text" class="gift-price" placeholder="Price">' +
  '<button type="submit" class="gift-submit">Submit</button>' +
  '</form>' +
  '</div>' +
  '</div>'
)
function createAccount() {
  $('.signup-form').submit('.form-submit', function(e) {
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
          //set token in localStorage and pass token to next function
          success: function(data) {
            const token = data.authToken;
            localStorage.setItem('token', token);
            console.log(token);
            authenticateUser(token);

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

//use token to access protected endpoint
function authenticateUser(token) {


    $.ajax({
      method: 'GET',
      url: '/api/protected',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      success: function(data) {
        console.log(data)
        $('.container').html(homePage);
      },
      error: function(err) {
        console.log(err);
      },
      dataType: 'json',
      contentType: 'application/json'
  })
}





// function existingUserLogin() {
//   $('.login-submit').on('submit', function(e) {
//     e.preventDefault();
//
//     const loginData = {
//       username: $(e.currentTarget).find('.username').val(),
//       password: $(e.currentTarget).find('.password').val()
//     };
//
//     $.ajax({
//       method: 'POST',
//       url: '/api/auth/login',
//       data: JSON.stringify(loginData),
//       success: function(data) {
//         console.log(data)
//         const token = data.authToken;
//
//         $.ajax({
//           method: 'GET',
//           url: '/api/protected',
//           headers: {
//             'Authorization': `Bearer ${token}`
//           },
//           dataType: 'json',
//           contentType: 'application/json'
//         });
//       },
//       dataType: 'json',
//       contentType: 'application/json'
//     })
//   })
// }



$(function() {
  createAccount();

  // existingUserLogin();
});
