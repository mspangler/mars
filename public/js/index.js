$(document).ready(function() {

  function showPosition(position) {
    var latlong = 'Latitude: ' + position.coords.latitude + '<br />' +
                 'Longitude: ' + position.coords.longitude;
    $('#position').html(latlong);
    findRestaurants(position.coords.longitude, position.coords.latitude);
  }

  function findRestaurants(longitude, latitude) {
    $.getJSON('/find/' + longitude + '/' + latitude, function(data) {
      console.log( "success" );
      $.each(data, function(index, restaurant) {
        console.log(restaurant.name);
        $('#yelp').append('<li>' + restaurant.name + ' - <a target="_blank" href="' + restaurant.mobile_url + '">' + restaurant.mobile_url + '</a></li>');
      });
    })
    .fail(function() {
      console.log( "error" );
    });
  }

  getLocation(showPosition);


});
