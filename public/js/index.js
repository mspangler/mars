$(document).ready(function() {

  function callback(position) {
    var latitude = position.coords.latitude,
       longitude = position.coords.longitude;

    showCoordinates(latitude, longitude);
    findAddress(latitude, longitude);
    findRestaurants(latitude, longitude);
  }

  function showCoordinates(latitude, longitude) {
    var latlong = 'Latitude: ' + latitude + '<br />' +
                 'Longitude: ' + longitude;
    $('#coordinates').html(latlong);
  }

  function findAddress(latitude, longitude) {
    $.getJSON('/address/' + latitude  + '/' + longitude, function(data) {
      $('#address').html('Address: ' + data['formatted_address']);
    })
    .fail(function() {
      console.log('findAddress: error');
    });
  }

  function findRestaurants(latitude, longitude) {
    $.getJSON('/restaurants/' + latitude  + '/' + longitude , function(data) {
      $.each(data, function(index, restaurant) {
        console.log(restaurant.name);
        $('#restaurants').append('<li><a target="_blank" href="' + restaurant.mobile_url + '">' + restaurant.name + ' - ' + getMiles(restaurant.distance).toPrecision(2) + ' miles away</a></li>');
      });
    })
    .fail(function() {
      console.log('findRestaurants: error');
    });
  }

  function getMiles(meters) {
    return meters * 0.000621371192;
  }

  getCoordinates(callback);

});
