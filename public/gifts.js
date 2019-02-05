'use strict';
$(function() {
  const fullName = localStorage.getItem('fullName');
  const giftData = localStorage.getItem('gifts');
  const parsedGiftData = JSON.parse(giftData);
  console.log(parsedGiftData)
  $('.display-name').html(`${fullName}'s gift list`)

  for (let i = 0; i < parsedGiftData.length; i++) {
    $('.gift-list').append(
      `<li class="eachResult">
           <div class="hyperlink"><a href="${parsedGiftData[i].giftLink}">${parsedGiftData[i].giftName}</a></div>
           <div class="price">${parsedGiftData[i].giftPrice}</price>
           <div class="buttons">
             <button type="button">Edit</button>
             <button type="button">Delete</button>
           </div>
       </li>
       `
   )
 };

})


function addGift() {
  $('.gift-submit').on('click', function(e) {
    e.preventDefault();

    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');

    const giftInfo = {
      giftName: $('.gift-name').val(),
      giftLink: $('.gift-link').val(),
      giftPrice: $('.gift-price').val()
    };

    $.ajax({
      method: 'POST',
      url: `/api/gifts/${username}`,
      headers: {
        'Authorization': `Bearer ${token}`
      },
      data: JSON.stringify(giftInfo),
      success: function(data) {
        console.log(data)
      },
      error: function(err) {
        console.log(err)
      },
      dataType: 'json',
      contentType: 'application/json'
    })

  })
}


$(addGift);
