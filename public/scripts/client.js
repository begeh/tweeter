/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//escape function validates text inputted in text-area to prevent malicious text from being processed
const escape = function (str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

//funnction renders tweets by taking tweet database and running it through createTweet function and, finally, prepending the tweets to the text-container section
const renderTweets = function (tweets) {
  for (user of tweets) {
    const $tweet = createTweetElement(user);
    $('.tweet-container').prepend($tweet);
  }
};

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
</article>`;
};


$(document).ready(function () {

  const loadTweets = function () {
    $.ajax('/tweets', { method: 'GET', datatype: 'json' })
      .then((res) => {
        $('.tweet-container').empty();
        renderTweets(res);
      });
  };

  //function submits tweet when 'tweet' button is clicked through ajax POST and GET requests. throws errors if input is empty/null or if text is too long when button is clicked.
  $(function () {
    const $submit = $('#text-form');
    $submit.on('submit', function(event) {
      event.preventDefault();
      if ($submit.find($('#text-area')).val() === `` || $submit.find($('#text-area')).val() === null) {
        $('#error').text('Field is empty. Please enter tweet before submitting.');
        $('#error').hide();
        $('#error').slideDown('slow');
        $("#text-area").focus();
      } else if ($submit.find($('#text-area')).val().length > 140) {
        $('#error').text("You are over 140 character limit.");
        $('#error').hide();
        $('#error').slideDown('slow');
        $("#text-area").focus();
      } else {
        $('#error').text('');
        $.ajax('/tweets', { method: 'POST', data: $submit.serialize() })
          .then(() => {
            loadTweets();
          });
        $('#text-area').val('');
        $('#counter').text('140');
        $('#counter').css('color', 'black');
        $("#text-area").focus();
      }
    });
  });

  $("#chevron").click(function (element) {
    element.preventDefault();
    $('.new-tweet').toggle('slow');
    $('#text-area').val('');
    $('#counter').text('140');
    $('#counter').css('color', 'black');
    $('#error').text('');
    $("#text-area").focus();
    $("#text-area").css('outline', '0');
  });

  $('#chevron').hover(function (element) {
    element.preventDefault();
    $('#chevron').css('cursor', 'pointer');
  });

  $(window).scroll(function(){
    const position = $(window).scrollTop();
    if(position > 110){
      $(".scroll-button").css("opacity", 1.0);
    } else{
      $(".scroll-button").css("opacity", 0.0);;
    }
  })

  $(".scroll-button").click(function(){
    if($('.new-tweet').is(':visible') === false){
      $('.new-tweet').toggle('slow');
    }
      windows.scrollTop();
    // }
  })

  loadTweets();
  $('.new-tweet').hide();
});