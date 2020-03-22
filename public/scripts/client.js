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
      $('.error-msg').text('Please submit something of actual value!').slideDown(300).delay(1000).slideUp();
    }
    if (textBox > 140) {
      $('.error-msg')
        .text('your text is too long, shorten it. Just like your life :)')
        .slideDown(300)
        .delay(1000)
        .slideUp();
    } else {
      const postMSG = $('#tweet-submit');
      $.ajax({
        method: 'POST',
        url: '/tweets/',
        data: postMSG.serialize(),
      }).then(() => {
        getTweets();
        $('#tweet-text').val('');
        $('.counter').text(140);
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
    let time = moment(data.created_at).fromNow();
    let $tweeterData = ` 
    <article class='tweet'>
                  <header>
                  <div class="user-info">
                    <img class="avatar" src=${data.user.avatars}/>
                     <h1 class='username'> ${data.user.name} </h1>
                     <aside class='handle'> ${data.user.handle} </aside>
                     </div>
                     <div class='tweet-text'>
                     <p class='tweet-content'> ${data.content.text} </p>
                     </div>
                     <footer>
                      <aside class='date'>${time} </aside>
                      <img class='like' src=https://puu.sh/FfXfE/29ec5b3350.png/>
                      <img class='retweet' src=https://puu.sh/FfXs1/5efa56dd79.png/>
                      <img class='flag' src=https://puu.sh/FfXvp/785b6844bb.png/>
                     </footer>
                </header>
                </article>`;
    return $tweeterData;
  };

  const getTweets = function() {
    $.ajax('/tweets', { method: 'GET' }).then((data) => {
      renderTweets(data);
    });
  };
  getTweets();
  $(`.write-tweet`).click(function() {
    $(`.new-tweet`).slideToggle(300);
  });

  $(`.write-tweet`).click(function() {
    $(`#tweet-text`).focus();
  });
});
