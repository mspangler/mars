$(document).ready(function() {

  function showPosition(position) {
    var latlong = 'Latitude: ' + position.coords.latitude + '<br />' +
                 'Longitude: ' + position.coords.longitude;
    $('#position').html(latlong);
  }

  getLocation(showPosition);

});
