(function() {
  var showError;

  showError = function(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        return console.log('User denied the request for Geolocation.');
      case error.POSITION_UNAVAILABLE:
        return console.log('Location information is unavailable.');
      case error.TIMEOUT:
        return console.log('The request to get user location timed out.');
      case error.UNKNOWN_ERROR:
        return console.log('An unknown error occurred.');
    }
  };

  this.getCoordinates = function(callback) {
    if (navigator.geolocation) {
      return navigator.geolocation.getCurrentPosition(callback, showError);
    } else {
      return console.log('Geolocation is not supported by this browser.');
    }
  };

}).call(this);

(function() {
  $(function() {
    var bindTapEvent, callback, getAddress, getLink, getRestaurants, parseGoogle, parseYelp, showCoordinates;
    callback = function(position) {
      var latitude, longitude;
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
      showCoordinates(latitude, longitude);
      getAddress(latitude, longitude);
      getRestaurants('google', latitude, longitude, parseGoogle);
      return getRestaurants('yelp', latitude, longitude, parseYelp);
    };
    showCoordinates = function(latitude, longitude) {
      var latlong;
      latlong = 'Latitude: ' + latitude + '<br />' + 'Longitude: ' + longitude;
      return $('#coordinates').html(latlong);
    };
    getAddress = function(latitude, longitude) {
      return $.getJSON('/address/' + latitude + '/' + longitude, function(data) {
        return $('#address').html('Address: ' + data.formatted_address);
      });
    };
    bindTapEvent = function() {
      return $('.list-group-item').hammer().on('tap', function(e) {
        var previous;
        previous = $(this).closest(".list-group").children(".active");
        previous.removeClass('active');
        return $(e.target).addClass('active');
      });
    };
    getLink = function(url, name) {
      return '<a target="_blank" class="list-group-item" href="' + url + '">' + name + '</a>';
    };
    parseGoogle = function(restaurant) {
      return getLink(restaurant.url, restaurant.name);
    };
    parseYelp = function(restaurant) {
      return getLink(restaurant.hash.mobile_url, restaurant.hash.name);
    };
    getRestaurants = function(service, latitude, longitude, parser) {
      return $.getJSON('/' + service + '/' + latitude + '/' + longitude, function(restaurants) {
        $.each(restaurants, function(index, value) {
          var link;
          link = parser(value);
          return $('#' + service).append(link);
        });
        return bindTapEvent();
      });
    };
    return getCoordinates(callback);
  });

}).call(this);
