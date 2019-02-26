const giftItemTemplate =
     '<li class="gift-item">' +
     '<div class="hyperlink"></div>' +
     '<div class="price"></div>' +
     '<div class="buttons">' +
     '<button class="delete-button" type="button">Delete</button>' +
     '</div>' +
     '</li>';


const username = localStorage.getItem('username');
const token = localStorage.getItem('token');

function getAndDisplayGiftList() {
  console.log('Retrieving gift list');

  $.getJSON(`/api/gifts/${username}`, function(items) {

    let itemElements = items.map(function(item) {
      let element = $(giftItemTemplate);
      element.attr('id', item.id);
      let itemName = element.find('.hyperlink');
      itemName.append(`<a href=${item.giftLink}>${item.giftName}</a>`);
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
      console.log(data)
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
  $('.gift-input').submit(function(e) {
    e.preventDefault();

    addGiftItem({
      giftName: $('.gift-name').val(),
      giftLink: $('.gift-link').val(),
      giftPrice: $('.gift-price').val()
    });
  });
}

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

function searchUser() {
  $('.search-users').submit(function(e) {
    e.preventDefault();
    const username = $('.username').val();
    $.ajax({
      method: 'GET',
      url: `/api/gifts/${username}`,
      success: function(data) {
        console.log(data)
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


$(function() {
  getAndDisplayGiftList();
  handleGiftAdd();
  handleGiftDelete();
  searchUser();
  logoutUser();
})
