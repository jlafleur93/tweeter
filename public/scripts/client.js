/* 
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
  $('#tweet-submit').submit(function(event) {
    event.preventDefault();
    $('.error-msg').slideUp(300);
    let textBox = $('#tweet-text').val().length;
    if (textBox < 1 || textBox === null) {
      $('.error-msg').text('nice try').slideDown(300);
    }
    if (textBox > 140) {
      $('.error-msg').text('your text is too long, shorten it. Just like your life :)').slideDown(300);
    } else {
      let postMSG = $('#tweet-submit');
      $.ajax({
        method: 'POST',
        url: '/tweets/',
        data: postMSG.serialize(),
      }).then(() => {
        getTweets();
      });
    }
  });

  const renderTweets = function(tweets) {
    for (let tweet of tweets) {
      const $tweetRender = createdTweetElement(tweet);
      $('.tweet-container').prepend($tweetRender);
    }
  };

  const createdTweetElement = function(data) {
    const $tweeterData = $('<article>')
      .addClass('tweet')
      .append($('<header>').text(data.user.name))
      .append($('<p>').text(data.content.text))
      .append($('<h2>').text(data.created_at))
      .append($('<aside>').addClass('handle').text(data.user.handle))
      .append($('<footer>').append($(`<img src=${data.user.avatars}>`)));
    return $tweeterData;
  };

  const getTweets = function() {
    console.log(`testing gettweets`);
    $.ajax('/tweets', { method: 'GET' }).then((data) => {
      console.log(`data in getTweets`, data);
      renderTweets(data);
    });
  };
  getTweets();

  $(`#write-tweet`).click(function() {
    $(`.new-tweet`).slideToggle(300).focus();
  });

  $('.write-tweet').click(function() {
    $('.new-tweet').slideDown('slow', function() {});
  });
});
//almost done :)
