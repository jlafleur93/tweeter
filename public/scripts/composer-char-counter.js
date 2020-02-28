$(document).ready(function() {
  countDown();
});

const countDown = function() {
  $(`#tweet-text`).on('keyup', function() {
    let count = 140 - this.value.length;

    $(this).siblings('.counter').text(`${count}`);
  });
};
