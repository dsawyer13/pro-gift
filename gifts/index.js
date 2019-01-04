'use strict';
const {Gift} = require('./models');
const {router} = require('./router');

MOCK_GIFT_DATA = {
  "gifts": [
    {
      id: "1111111",
      giftName: "Sea Monkeys",
      giftLink: "https://www.amazon.com/Schylling-Sea-Monkeys-Ocean-Zoo/dp/B001CBZXEE",
      giftPrice: "$15"
    },
    {
      id: "2222222",
      giftName: "Pet Rock",
      giftLink: "https://www.amazon.com/Pet-Rock-Novelty-Broken-Walking/dp/B00I306JW2/ref=sr_1_1?s=toys-and-games&ie=UTF8&qid=1546641955&sr=1-1&keywords=pet+rock",
      giftPrice: "$19"
    },
    {
      id: "3333333",
      giftName: "SpongeBob Chia Pet",
      giftLink: "https://www.amazon.com/Chia-SpongeBob-Handmade-Decorative-Planter/dp/B002R0FQB4/ref=sr_1_2?s=toys-and-games&ie=UTF8&qid=1546642146&sr=1-2&keywords=chia+pet",
      price: "$20"
    }
  ]
}

const serverBase = "//localhost:8080";
const GIFTS_URL = serverBase + "/gifts";

function getAndDisplayGifts() {
  console.log("Retrieving list of gifts");
  $.getJSON(GIFTS_URL, function(gifts) {
    var giftElements = gifts.map(function(item) {
      var element = $()
    })
  })
}



module.exports = {Resource, router};
