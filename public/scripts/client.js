/* 
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
  $('#tweet-submit').submit(function(event) {
    event.preventDefault();
    let textBox = $('#tweet-text').val().length;
    if (textBox < 1 || textBox === null) {
      alert('sup');
    }
    if (textBox > 140) {
      alert('your text is too long, shorten it. Just like your life :)');
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
      $('.tweet-container').append($tweetRender);
    }
  };

  const createdTweetElement = function(data) {
    const $tweeterData = $('<article>')
      .addClass('tweet')
      .append($('<header>').text(data.user.name))
      .append($('<p>').text(data.content.text))
      .append($('<h2>').text(data.created_at))
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

  $('.new-tweet').hide();
  $('.write-tweet').click(function() {
    $('.new-tweet').slideDown('slow', function() {
      console.log('sup');
    });
  });
});
//almost done :)
