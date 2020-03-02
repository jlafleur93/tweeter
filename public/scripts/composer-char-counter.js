$(document).ready(function() {
  countDown();
});

const countDown = function() {
  $(`#tweet-text`).on('keyup', function() {
    let count = 140 - this.value.length;
    if (count < 0) {
      $(this).siblings('.counter').css('color', 'red');
    }

    $(this).siblings('.counter').text(`${count}`);
  });
};
