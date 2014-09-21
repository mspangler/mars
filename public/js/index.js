$(document).ready(function() {

  function callback(position) {
    var coordinates = [ position.coords.latitude, position.coords.longitude ];
    showCoordinates(coordinates);
    findAddress(coordinates);
    findRestaurants(coordinates);
  }

  function showCoordinates(coordinates) {
    var latlong = 'Latitude: ' + coordinates[0] + '<br />' +
                 'Longitude: ' + coordinates[1];
    $('#coordinates').html(latlong);
  }

  function findAddress(coordinates) {
    $.getJSON('/address/' + coordinates[0]  + '/' + coordinates[1], function(data) {
      $('#address').html('Address: ' + data['formatted_address']);
    })
    .fail(function() {
      console.log('findAddress: error');
    });
  }

  function findRestaurants(coordinates) {
    $.getJSON('/restaurants/' + coordinates[0]  + '/' + coordinates[1] , function(data) {
      $.each(data, function(index, restaurant) {
        console.log(restaurant.name);
        $('#restaurants').append('<li><a target="_blank" href="' + restaurant.mobile_url + '">' + restaurant.name + '</a></li>');
      });
    })
    .fail(function() {
      console.log('findRestaurants: error');
    });
  }

  getCoordinates(callback);

});
