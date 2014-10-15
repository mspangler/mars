
$(document).ready(function() {

  function callback(position) {
    var latitude = position.coords.latitude,
       longitude = position.coords.longitude;

    showCoordinates(latitude, longitude);
    findAddress(latitude, longitude);
    getRestaurants('google', latitude, longitude, parseGoogle);
    getRestaurants('yelp', latitude, longitude, parseYelp);
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

  function bindTapEvent() {
    $('.list-group-item').hammer().on('tap', function(e) {
      var previous = $(this).closest(".list-group").children(".active");
      previous.removeClass('active'); // previous list-item
      $(e.target).addClass('active'); // activated list-item
    });
  }

  function getLink(url, name) {
    return '<a target="_blank" class="list-group-item" href="' + url + '">' + name + '</a>';
  }

  function parseGoogle(restaurant) {
    return getLink(restaurant.url, restaurant.name);
  }

  function parseYelp(restaurant) {
    return getLink(restaurant.hash.mobile_url, restaurant.hash.name);
  }

  function getRestaurants(service, latitude, longitude, parser) {
    $.getJSON('/' + service + '/' + latitude + '/' + longitude, function(restaurants) {
      $.each(restaurants, function(index, value) {
        var link = parser(value);
        $('#' + service).append(link);
      });
      bindTapEvent();
    });
  }

  getCoordinates(callback);

});
