
$(document).ready(function() {

  function getMiles(meters) {
    return (meters * 0.000621371192).toPrecision(2);
  }

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

  function bindClick() {
    $('.list-group-item').on('tap', function(e) {
      var previous = $(this).closest(".list-group").children(".active");
      previous.removeClass('active'); // previous list-item
      $(e.target).addClass('active'); // activated list-item
    });
  }

  function findRestaurants(latitude, longitude) {
    $.getJSON('/restaurants/' + latitude  + '/' + longitude, function(restaurants) {
      $.each(restaurants, function(index, restaurant) {
        var link = '<a target="_blank" class="list-group-item" href="' + restaurant.mobile_url + '">' + restaurant.name + ' - ' + getMiles(restaurant.distance) + ' miles </a>';
        $('#restaurants').append(link);
        bindClick();
      });
    });
  }

  getCoordinates(callback);

});
