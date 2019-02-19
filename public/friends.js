const giftItemTemplate =
     '<li class="gift-item">' +
     '<div class="hyperlink"></div>' +
     '<div class="price"></price>' +
     '<div class="buttons">' +
     '<button class="checkGift">Purchased this</button>' +
     '</div>' +
     '</li>';

const friendGift = localStorage.getItem('friendGifts');
const username = friendGift[0].username;

function getAndDisplayFullName() {
  $.ajax({
    method: 'GET',
    url: `/api/users/${friendUsername}`,
    success: function(data) {
      console.log(data);
      const fullName = data[0].firstName + " " + data[0].lastName;
      $('.display-name').text(fullName);
    }
  })
}

function displayFriendGiftList() {
  console.log('Retrieving friend\'s gift list');

  $.getJson(`/api/gifts/${username}`, function(items) {

    let itemElements = items.map(function(item) {
      let element = $(giftItemTemplate);
      element.attr('id', item.id);        
      let itemName = element.find('.hyperlink');
      itemName.append(`<a href=${item.giftLink}>${item.giftName}</a>`)

      return element
    });
    $('.gift-list'.html(itemElements))
  });
}
