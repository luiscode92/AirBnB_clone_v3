const $ = window.$;
$(document).ready(function () {
  const amenities = {};
  $('input:checkbox').click(function () {
    $(this).each(function () {
      if (this.checked) {
        amenities[$(this).data('id')] = $(this).data('name');
      } else {
        delete amenities[$(this).data('id')];
      }
    });
    if (Object.values(amenities).length > 0) {
      $('.amenities h4').text(Object.values(amenities).join(', '));
    } else {
      $('.amenities h4').html('&nbsp');
    }

    $.get('http://127.0.0.1:5001/api/v1/status/', function (data, status) {
      console.log(data);
      if (data.status === 'OK') {
        $('DIV#api_status').addClass('available');
        $('DIV#api_status').removeClass('unavailable');
      } else {
        $('DIV#api_status').removeClass('available');
        $('DIV#api_status').addClass('unavailable');
      }
    });
  });
});
