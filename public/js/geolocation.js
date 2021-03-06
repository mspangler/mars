
function showError(error) {
  switch (error.code) {
      case error.PERMISSION_DENIED:
          console.log('User denied the request for Geolocation.');
          break;
      case error.POSITION_UNAVAILABLE:
          console.log('Location information is unavailable.');
          break;
      case error.TIMEOUT:
          console.log('The request to get user location timed out.');
          break;
      case error.UNKNOWN_ERROR:
          console.log('An unknown error occurred.');
          break;
  }
}

function getCoordinates(callback) {
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(callback, showError, { maximumAge: 600000 }); // set the cache for 10min
  } else {
      console.log('Geolocation is not supported by this browser.');
  }
}
