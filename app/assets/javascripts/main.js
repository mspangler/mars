
function initMap() {

  var map = new google.maps.Map(document.getElementById('map-canvas'), {
    //center: { lat: -34.397, lng: 150.644 },
    zoom: 17
  });

  var infoWindow = new google.maps.InfoWindow({
    map: map,
    content: 'Determining location...'
  });

  var geoOptions = {
    enableHighAccuracy: true, // provides a hint that the application would like to receive the best possible results.
    maximumAge : 10000, // indicates that the application is willing to accept a cached position whose age is no greater than the specified time in milliseconds.
    timeout : 10000
  };

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      handleLocationSuccess(map, infoWindow, position);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    },
    geoOptions);
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

function handleLocationSuccess(map, infoWindow, position) {
  var pos = {
    lat: position.coords.latitude,
    lng: position.coords.longitude
  };

  infoWindow.setContent('Name of place');
  infoWindow.close();

  map.setCenter(pos);
  var marker = new google.maps.Marker({
    position: pos,
    map: map
  });

  marker.addListener('click', function() {
    infoWindow.open(map, marker);
  });

  // Specify location, radius and place types for your Places API search.
  var request = {
    location: pos,
    radius: '500',
    types: ['restaurant', 'bar']
  };

  // Create the PlaceService and send the request.
  // Handle the callback with an anonymous function.
  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, function(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        var place = results[i];
        // If the request succeeds, draw the place location on
        // the map as a marker, and register an event to handle a
        // click on the marker.
        var marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location
        });
      }
    }
  });

  // document.getElementById('submit').addEventListener('click', function() {
  //   placeDetailsByPlaceId(service, map, infoWindow);
  // });
}

function placeDetailsByPlaceId(service, map, infowindow) {
  // Create and send the request to obtain details for a specific place,
  // using its Place ID.
  var request = {
    placeId: document.getElementById('place-id').value
  };

  service.getDetails(request, function (place, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      // If the request succeeds, draw the place location on the map
      // as a marker, and register an event to handle a click on the marker.
      var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
      });

      google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
          'Place ID: ' + place.place_id + '<br>' +
          place.formatted_address + '</div>');
        infowindow.open(map, this);
      });

      map.panTo(place.geometry.location);
    }
  });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
}
