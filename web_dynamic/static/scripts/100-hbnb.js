const $ = window.$;
$(document).ready(function () {
  const search = {};
  const amenities = {};
  $('.amenities input:checkbox').click(function () {
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
  });
  const states = {};
  $('.locations li #states_checkbox').click(function () {
    $(this).each(function () {
      if (this.checked) {
        console.log($(this).attr('data-name'));
        states[$(this).data('id')] = $(this).data('name');
      } else {
        delete states[$(this).data('id')];
      }
    });

    const StatesAndCities = Object.assign({}, cities, states);
    if (Object.values(StatesAndCities).length > 0) {
      $('.locations h4').text(Object.values(StatesAndCities).join(', '));
    } else {
      $('.locations h4').html('&nbsp');
    }
  });

  const cities = {};
  $('.locations li #city_checkbox').click(function () {
    console.log(cities);
    $(this).each(function () {
      if (this.checked) {
        cities[$(this).data('id')] = $(this).data('name');
      } else {
        delete cities[$(this).data('id')];
      }
    });

    const StatesAndCities = Object.assign({}, cities, states);
    console.log(cities);
    if (Object.values(StatesAndCities).length > 0) {
      $('.locations h4').text(Object.values(StatesAndCities).join(', '));
    } else {
      $('.locations h4').html('&nbsp');
    }
  });

  $.get('http://0.0.0.0:5001/api/v1/status/', function (data, status) {
    console.log(data);
    if (data.status === 'OK') {
      $('DIV#api_status').addClass('available');
      $('DIV#api_status').removeClass('unavailable');
    } else {
      $('DIV#api_status').removeClass('available');
      $('DIV#api_status').addClass('unavailable');
    }
  });

  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    type: 'POST',
    data: '{}',
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    success: function (dataset) {
      $.each(dataset, function (i, place) {
        const places = '<article>\n' +
        '<div class="title_box">\n' +
        '<h2>' + place.name + '</h2>\n' +
        '<div class="price_by_night">$' + place.price_by_night + '</div>\n' +
        '</div>\n' +
        '<div class="information">\n' +
        '<div class="max_guest"> ' + place.max_guest + ' Guests</div>\n' +
        '<div class="number_rooms"> ' + place.number_rooms + ' Bedrooms</div>\n' +
        '<div class="number_bathrooms"> ' + place.number_bathrooms + ' Bathrooms</div>\n' +
        '</div>\n' +
        '<div class="description">\n' +
        place.description + '\n' +
        '</div>\n' +
        '</article>';
        $('SECTION.places').append(places);
      });
    }
  });
  $('button').click(function () {
    search.amenities = Object.keys(amenities);
    search.states = Object.keys(states);
    search.cities = Object.keys(cities);
    console.log(search);
    $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      type: 'POST',
      data: JSON.stringify(search),
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      success: function (dataset) {
        $('SECTION.places').empty();
        $.each(dataset, function (i, place) {
          const places = '<article>\n' +
          '<div class="title_box">\n' +
          '<h2>' + place.name + '</h2>\n' +
          '<div class="price_by_night">$' + place.price_by_night + '</div>\n' +
          '</div>\n' +
          '<div class="information">\n' +
          '<div class="max_guest"> ' + place.max_guest + ' Guests</div>\n' +
          '<div class="number_rooms"> ' + place.number_rooms + ' Bedrooms</div>\n' +
          '<div class="number_bathrooms"> ' + place.number_bathrooms + ' Bathrooms</div>\n' +
          '</div>\n' +
          '<div class="description">\n' +
          place.description + '\n' +
          '</div>\n' +
          '</article>';
          $('SECTION.places').append(places);
        });
      }
    });
  });
});
