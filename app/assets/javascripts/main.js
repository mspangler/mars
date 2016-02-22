
function initMap() {

  var map = new google.maps.Map(document.getElementById('map-canvas'), {
    //center: { lat: -34.397, lng: 150.644 },
    zoom: 20
  });

  var infoWindow = new google.maps.InfoWindow({
    map: map,
    content: 'Determining location...'
  });

  var options = {
    enableHighAccuracy: true, // provides a hint that the application would like to receive the best possible results.
    maximumAge : 10000, // indicates that the application is willing to accept a cached position whose age is no greater than the specified time in milliseconds.
    timeout : 10000
  };

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      handleSuccess(map, infoWindow, position);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    },
    options);
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

function handleSuccess(map, infoWindow, position) {
  var pos = {
    lat: position.coords.latitude,
    lng: position.coords.longitude
  };

  infoWindow.setPosition(pos);
  infoWindow.setContent('Location found.');
  map.setCenter(pos);
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
}
