const giftItemTemplate =
     '<li class="gift-item">' +
       '<div class="hyperlink"></div>' +
       '<div class="price"></div>' +
       '<div class="purchaseItemDiv">' +
       '<div class="buttons">' +
       '<button class="checkGift">Purchase this</button>' +
       '</div>' +
       '</div>' +
     '</li>';

const friendGift = localStorage.getItem('friendGifts');
const parsedFriendGift = JSON.parse(friendGift);
const friendUsername = parsedFriendGift[0].username;
const token = localStorage.getItem('token');

//used to add purchased by 'fullName'
const fullName = localStorage.getItem('fullName');

function getAndDisplayFullName() {
  $.ajax({
    method: 'GET',
    url: `/api/users/${friendUsername}`,
    success: function(data) {
      console.log(data);
      const fullName = data[0].firstName + " " + data[0].lastName;
      $('.display-name').text(`${fullName}\'s list`);
    }
  })
}

function displayFriendGiftList() {
  console.log('Retrieving friend\'s gift list');

  $.getJSON(`/api/gifts/${friendUsername}`, function(items) {

    let itemElements = items.map(function(item) {
      let element = $(giftItemTemplate);
      element.attr('id', item.id);

      let itemName = element.find('.hyperlink');
      itemName.append(`<a href=${item.giftLink}>${item.giftName}</a>`)

      let itemPrice = element.find('.price');
      itemPrice.text(item.giftPrice)
      element.attr('purchased', item.purchased);

      if(item.purchased) {
        itemName.addClass('purchasedGift');
        let itemPurchased = element.find('.purchaseItemDiv');
        itemPurchased.append(`Purchased by ${fullName}`)
      }


      return element
    });
    $('.gift-list').html(itemElements)
  });
}


function handlePurchaseGift() {
  $('.gift-list').on('click', '.checkGift', function(e) {
    e.preventDefault();
    let element = $(e.currentTarget).closest('.gift-item');

    let item = {
      id: element.attr('id'),
      giftName: element.find('.hyperlink a').text(),
      giftLink: element.find('.hyperlink a').attr('href'),
      giftPrice: element.find('.price').text(),
      purchased: !JSON.parse(element.attr('purchased'))
    };
    updatePurchaseStatus(item);
  });
}


function updatePurchaseStatus(item) {
  $.ajax({
    method: 'PUT',
    url: `/api/gifts/${item.id}`,
    data: JSON.stringify(item),
    success: function(data) {
      displayFriendGiftList();
    },
    dataType: 'json',
    contentType: 'application/json'
  });
}

function addGiftItem(item) {
  $.ajax({
    method: 'POST',
    url: `api/gifts/${friendUsername}`,
    headers: {
      'Authorization': `Bearer ${token}`
    },
    data: JSON.stringify(item),
    success: function(data) {
      console.log(data)
      displayFriendGiftList();
    },
    dataType: 'json',
    contentType: 'application/json'
  })
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


$(function() {
  getAndDisplayFullName();
  displayFriendGiftList();
  handlePurchaseGift();
  handleGiftAdd();
})
