$(document).ready(function() {
  countDown();
});

const countDown = function() {
  $(`#tweet-text`).on('keyup', function() {
    let count = 140 - this.value.length;
    console.log(`count check: ${count}`);
    if (count < 0) {
      $('.counter').css('color', 'red');
    }
    $('.counter').text(`${count}`);
  });
};
