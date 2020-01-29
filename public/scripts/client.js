/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const convertDate = function(date){
  let timeSince = (new Date()).getTime() - date;
  
  if(timeSince % 31556952000 > 0){
    if(timeSince % 31556952000 > 0 === 1){
      return Math.floor(timeSince / 31556952000) + ' year ago';
    } else{
      return Math.floor(timeSince / 31556952000) + ' years ago';
    }
  } else if(timeSince % 2592000000	 > 0){
    if(timeSince % 2592000000	 > 0 === 1){
      return Math.floor(timeSince / 2592000000) + ' a month ago';
    } else{
      return Math.floor(timeSince / 2592000000) + ' months ago';
    }
  } else if(timeSince % 86400000 > 0){
    if(timeSince % 86400000 > 0 === 1){
      return Math.floor(timeSince / 86400000) + ' day ago';
    } else{
      return Math.floor(timeSince / 86400000) + ' days ago';
    }
  } else if(timeSince % 3600000 > 0){
    if(timeSince % 3600000 > 0 === 1){
      return Math.floor(timeSince / 3600000) + ' an hour ago';
    } else{
      return Math.floor(timeSince / 3600000) + ' hours ago';
    }
  } else{
    if(timeSince % 1000 > 0 === 1){
      return Math.floor(timeSince / 1000) + ' a second ago';
    } else{
      return Math.floor(timeSince / 1000) + ' seconds ago';
    }
  }
  
}

const renderTweets = function (tweets) {
  for (user of tweets) {
    const $tweet = createTweetElement(user);
    $('.tweet-container').append($tweet);
  }
}

const createTweetElement = function (tweet) {
  return `
  <article class='tweets'>
  <header>
  <img class='tweeter-icon' src=${tweet.user.avatars} />
  <p class='name'>${tweet.user.name}</p>
  <p class='handle'>${tweet.user.handle}</p>
</header>
<div>
  <p class='the-tweet'>${tweet.content.text}</p>
</div>
<footer>
  <p>${convertDate(tweet.created_at)}</p>
  <div class='icons-container'>
    <img class='icons' src="https://img.icons8.com/material-sharp/24/000000/flag.png">
    <img class='icons' src="https://img.icons8.com/material-sharp/24/000000/retweet.png">
    <img class='icons' src="https://img.icons8.com/material-sharp/24/000000/like.png">
  </div>
</footer>
</article>`
};

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

$(document).ready(function(){
  renderTweets(data);
});


// const $tweet = createTweetElement(data);

// Test / driver code (temporary)
// console.log($tweet); // to see what it looks like
// $('.tweet-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
