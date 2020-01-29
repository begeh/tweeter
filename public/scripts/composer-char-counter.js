$(document).ready(() => {
  console.log('Hello');

  $("#text-form textarea").on('input', function () {
    $('#counter').text(140 - this.value.length);
    if (140 - this.value.length < 0) {
      $(this).parent().find($('#counter')).css('color', 'red');
    } else {
      $(this).parent().find($('#counter')).css('color', 'black');
    }
  });
});
