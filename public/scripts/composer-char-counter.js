$(document).ready(function() {
  countDown();
});

const countDown = function() {
  $(`#tweet-text`).on('keyup', function() {
    let count = 140 - this.value.length;
    if (count < 0) {
      $('.counter').toggleClass('red-counter', true);
    } else {
      $('.counter').toggleClass('red-counter', false);
    }

    $('.counter').text(`${count}`);
  });
};
