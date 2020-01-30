$(document).ready(() => {
  $("#text-form textarea").on('input', function () {
    $('#counter').text(140 - this.value.length);
    if (140 - this.value.length < 0) {
      $('#error').text("You are over 140 character limit.");
      $(this).parent().find($('#counter')).css('color', 'red');
    } else {
      $('#error').text('');
      $(this).parent().find($('#counter')).css('color', 'black');
    }
  });
});
