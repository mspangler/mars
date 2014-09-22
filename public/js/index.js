/** @jsx React.DOM */

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
      $('#address').html('Address: ' + data.formatted_address);
    });
  }

  function findRestaurants(latitude, longitude) {
    var url = '/restaurants/' + latitude  + '/' + longitude;
    React.renderComponent(
      <RestaurantList url={url} />,
      document.getElementById('restaurants')
    );
  }

  getCoordinates(callback);

});
