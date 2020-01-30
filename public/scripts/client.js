/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const convertDate = (date) => {
  let timeSince = (new Date()).getTime() - date;
  console.log(timeSince);

  if (Math.floor(timeSince / 31556952000) > 0) {
    if (Math.floor(timeSince / 31556952000) === 1) {
      return Math.floor(timeSince / 31556952000) + ' year';
    } else {
      return Math.floor(timeSince / 31556952000) + ' years';
    }
  } else if (Math.floor(timeSince / 2592000000) > 0) {
    if (Math.floor(timeSince / 2592000000) === 1) {
      return Math.floor(timeSince / 2592000000) + ' a month';
    } else {
      return Math.floor(timeSince / 2592000000) + ' months';
    }
  } else if (Math.floor(timeSince / 86400000) > 0) {
    if (Math.floor(timeSince / 86400000) === 1) {
      return Math.floor(timeSince / 86400000) + ' day';
    } else {
      return Math.floor(timeSince / 86400000) + ' days';
    }
  } else if (Math.floor(timeSince / 3600000) > 0) {
    if (Math.floor(timeSince / 3600000) === 1) {
      return Math.floor(timeSince / 3600000) + ' an hour';
    } else {
      return Math.floor(timeSince / 3600000) + ' hours';
    }
  } else if (Math.floor(timeSince / 1000) === 1) {
    if (Math.floor(timeSince / 1000) === 1) {
      return Math.floor(timeSince / 1000) + ' a second';
    } else {
      return Math.floor(timeSince / 1000) + ' seconds';
    }
  } else {
    return `0 seconds`;
  }
}

const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

const renderTweets = function (tweets) {
  for (user of tweets) {
    const $tweet = createTweetElement(user);
    $('.tweet-container').prepend($tweet);
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
  <p class='the-tweet'>${escape(tweet.content.text)}</p>
</div>
<footer>
  <p>${moment(tweet.created_at).fromNow()}</p>
  <div class='icons-container'>
    <img class='icons' src="https://img.icons8.com/material-sharp/24/000000/flag.png">
    <img class='icons' src="https://img.icons8.com/material-sharp/24/000000/retweet.png">
    <img class='icons' src="https://img.icons8.com/material-sharp/24/000000/like.png">
  </div>
</footer>
</article>`
};


$(document).ready(function () {

  const loadTweets = function () {
    $.ajax('/tweets', { method: 'GET', datatype: 'json' })
    .then((res) => {
      $('.tweet-container').empty();
      renderTweets(res);
    });
  };

  $(function () {
    const $submit = $('#text-form');
    $submit.on('submit', function (event) {
      event.preventDefault();
      if ($submit.serialize() === `text=` || $submit.serialize() === null) {
        alert('Field is empty. Please enter tweet before submitting.');
      } else if ($submit.serialize().length > 145) {
        alert("You are over 140 character limit. Please reduce length of tweet and resubmit");
      } else {
        $.ajax('/tweets', { method: 'POST', data: $submit.serialize() })
          .then(() => { loadTweets() });
      }
    });
  });

  $( "#chevron" ).click(function(element) {
    element.preventDefault();
    $('.new-tweet').toggle('slow');
  });
  
  loadTweets();
});
