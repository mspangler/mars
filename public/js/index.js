
$(document).ready(function() {

  function getMiles(meters) {
    return (meters * 0.000621371192).toPrecision(2);
  }

  function callback(position) {
    var latitude = position.coords.latitude,
       longitude = position.coords.longitude;

    showCoordinates(latitude, longitude);
    findAddress(latitude, longitude);
    findYelpRestaurants(latitude, longitude);
    findGoogleRestaurants(latitude, longitude);
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

  function findYelpRestaurants(latitude, longitude) {
    $.getJSON('/yelp/' + latitude  + '/' + longitude, function(restaurants) {
      $.each(restaurants, function(index, data) {
        var restaurant = data.hash,
            distance = '<span class="badge pull-right">' + getMiles(restaurant.distance) + ' miles</span>',
            link = '<a target="_blank" class="list-group-item" href="' + restaurant.mobile_url + '">' + restaurant.name + '</a>';
        $('#yelp').append(link);
      });
      bindTapEvent();
    });
  }

  function findGoogleRestaurants(latitude, longitude) {
    $.getJSON('/google/' + latitude + '/' + longitude, function(restaurants) {
      $.each(restaurants, function(index, restaurant) {
        console.log(restaurant);
        var link = '<a target="_blank" class="list-group-item" href="' + restaurant.url + '">' + restaurant.name + '</a>';
        $('#google').append(link);
      });
      bindTapEvent();
    });
  }

  getCoordinates(callback);

});
