
function geoFindMe() {

  var geoOptions = {
    enableHighAccuracy: true,
    maximumAge : 10000,
    timeout : 10000
  };

  if (navigator.geolocation) {
    console.log('checking geolocation...');
    navigator.geolocation.getCurrentPosition(success, error, geoOptions);
  } else {
    console.log("Geolocation services are not supported by your web browser.");
  }

  function success(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    var accuracy = position.coords.accuracy;
    var timestamp = position.timestamp;

    console.log('latitude: ' + latitude);
    console.log('longitude: ' + longitude);
    console.log('accuracy: ' + accuracy);
    console.log('timestamp: ' + timestamp);
  }

  function error(error) {
    switch(error.code) {
      case error.PERMISSION_DENIED:
        console.log("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        console.log("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        console.log("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        console.log("An unknown error occurred.");
        break;
    }
  }
}

geoFindMe();
