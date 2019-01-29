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
        const user = data.username;
        localStorage.setItem('username', user);
        console.log(user)
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
    const user = localStorage.getItem('username');
    //console.log(user);

    $.ajax({
      method: 'GET',
      url: `/api/gifts/${user}`,
      headers: {
        'Authorization': `Bearer ${token}`
      },
      success: function(data) {
        console.log(data);
        $('.container').empty();
        displayGifts(data);
      },
      error: function(err) {
        //console.log(err);
      },
      dataType: 'json',
      contentType: 'application/json'
  })
}

function displayGifts(data) {
  console.log(data);
  // $('.list-header').html(`${data.username}'s List'`);
  // $('.gift-list').empty();
  //
  // for (let i = 0; i < data.length; i++) {
  //   $('.gift-list').append(
  //     `<li class="eachResult">
  //         <div class="hyperlink"><a href="${data.giftLink}">${data.giftName}</a></div>
  //         <div class="price">${data.giftPrice}</price>
  //         <div class="buttons">
  //           <button type="button">Edit</button>
  //           <button type="button">Delete</button>
  //         </div>
  //     </li>
  //     `
//   )
// };
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
