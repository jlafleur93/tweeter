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
      $('.error-msg').text('nice try').slideDown(300).delay(4000).slideUp();
    }
    if (textBox > 140) {
      $('.error-msg')
        .text('your text is too long, shorten it. Just like your life :)')
        .slideDown(300)
        .delay(4000)
        .slideUp();
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
      .append(
        $('<header>')
          .append($(`<img src=${data.user.avatars}>`).addClass('avatar'))
          .append($('<h1>').text(data.user.name).addClass('username'))
          .append($('<aside>').addClass('handle').text(data.user.handle))
          .append($('<p>').text(data.content.text).addClass('tweet-content'))
          .append(
            $('<footer>')
              .append($('<aside>').addClass('date').text(getTime(data.created_at)))
              .append($(`<img src=https://puu.sh/FfXfE/29ec5b3350.png>`).addClass('like'))
              .append($(`<img src=https://puu.sh/FfXs1/5efa56dd79.png>`).addClass('retweet'))
              .append($(`<img src=https://puu.sh/FfXvp/785b6844bb.png>`).addClass('flag')),
          ),
      );

    return $tweeterData;
  };
  let getTime = function(timestamp) {
    let currentTime = Date.now();
    let min = 1000 * 60;
    let hour = min * 60;
    let day = hour * 24;
    let month = day * 30;
    let year = day * 365;
    let timeDiff = currentTime - timestamp;
    if (timeDiff < min) {
      return 'Posted just now.';
    } else if (timeDiff < hour) {
      return 'Posted ' + Math.floor(timeDiff / min) + ' Minutes Ago.';
    } else if (timeDiff < day) {
      return 'Posted ' + Math.floor(timeDiff / hour) + ' Hours Ago.';
    } else if (timeDiff < month) {
      return 'Posted ' + Math.floor(timeDiff / day) + ' Days Ago.';
    } else if (timeDiff < year) {
      return 'Posted ' + Math.floor(timeDiff / month) + ' Months Ago.';
    } else {
      return 'Posted ' + Math.floor(timeDiff / year) + ' Years ago.';
    }
  };

  const getTweets = function() {
    $.ajax('/tweets', { method: 'GET' }).then((data) => {
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
