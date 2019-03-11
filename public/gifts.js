const giftItemTemplate =
     '<li class="gift-item">' +
     '<div class="hyperlink"></div>' +
     '<div class="price"></div>' +
     '<div class="buttons">' +
     '<a href="#" class="delete-button" type="button">delete</a>' +
     '</div>' +
     '</li>';


const username = localStorage.getItem('username');
const token = localStorage.getItem('token');

const fullName = localStorage.getItem('fullName');
$('.fullname').text(fullName);

function getAndDisplayGiftList() {
  console.log('Retrieving gift list');

  $.getJSON(`/api/gifts/${username}`, function(items) {

    let itemElements = items.map(function(item) {
      let element = $(giftItemTemplate);
      element.attr('id', item.id);
      let itemName = element.find('.hyperlink');
      itemName.append(`<a href='${item.giftLink}' target='_blank'>${item.giftName}</a>`);
      let itemPrice = element.find('.price');
      itemPrice.text(item.giftPrice)
      return element
  });
  $('.gift-list').html(itemElements)
});
}

function addGiftItem(item) {
  console.log("Adding " + item);

  $.ajax({
    method: 'POST',
    url: `/api/gifts/${username}`,
    headers: {
      'Authorization': `Bearer ${token}`
    },
    data: JSON.stringify(item),
    success: function(data) {

      getAndDisplayGiftList();
    },
    dataType: 'json',
    contentType: "application/json"
  });
}

function deleteGiftItem(itemId) {
  $.ajax({
    method: 'DELETE',
    url: `/api/gifts/${itemId}`,
    headers: {
      'Authorization': `Bearer ${token}`
    },
    success: getAndDisplayGiftList
  });
}

function handleGiftAdd() {
  $('.gift-submit').click(function(e) {
    e.preventDefault();

    let giftLink = $('.gift-link').val();
    const prefix = 'https://';
    const prefix2 = 'http://';
    if (giftLink.substr(0, prefix.length) !== prefix && giftLink.substr(0, prefix2.length) !== prefix2 ) {
      giftLink = prefix + giftLink

      addGiftItem({
        giftName: $('.gift-name').val(),
        giftLink: giftLink,
        giftPrice: '$' + $('.gift-price').val()
      });
    } else {
    addGiftItem({
      giftName: $('.gift-name').val(),
      giftLink: $('.gift-link').val(),
      giftPrice: '$' + $('.gift-price').val()
    });
  };
  $('.gift-name').val('');
  $('.gift-link').val('');
  $('.gift-price').val('');
})}

function handleGiftDelete() {
  $('.gift-list').on('click', '.delete-button', function(e) {
    e.preventDefault();
    deleteGiftItem(
      $(e.currentTarget)
        .closest(".gift-item")
        .attr('id')
    );
  });
}

function verifyExistingUser() {
  $('.search-users').submit(function(e) {
    e.preventDefault();
    const username = $('.username').val()
    $.ajax({
      method: 'GET',
      url: `/api/users/verify/${username}`,
      success: function(data) {
        if(data === null) {
          $('.error-message').text('Incorrect username or password')
        } else {
          searchUser()
        }
      }
    })
  })
}

function searchUser() {
    const username = $('.username').val();
    $.ajax({
      method: 'GET',
      url: `/api/gifts/${username}`,
      success: function(data) {
        window.location.href = '/friend';
        localStorage.setItem('friendGifts', JSON.stringify(data));
      },
      error: function(err) {
        console.log(err);
      },
      dataType: 'json',
      contentType: 'application/json'
    })
  })
}

function logoutUser() {
  $('.logout').click(function(e) {
    e.preventDefault();
    localStorage.removeItem('token');
    window.location.href = '/login';
  })
}

function goHome() {
  $('.logo').click(function(){
    window.location.href = '/home';
  })
}

$(function() {
  getAndDisplayGiftList();
  handleGiftAdd();
  handleGiftDelete();
  verifyExistingUser();
  logoutUser();
  goHome();
})
