
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
      navigator.geolocation.getCurrentPosition(callback, showError, {maximumAge:600000});
  } else {
      console.log('Geolocation is not supported by this browser.');
  }
}
;
$(document).ready(function() {

  function callback(position) {
    var latitude = position.coords.latitude,
       longitude = position.coords.longitude;

    showCoordinates(latitude, longitude);

    $.getJSON('/address/' + latitude  + '/' + longitude, function(location) {
      $('#address').html('Address: ' + location.formatted_address);
      getPlaces();
    });
  }

  function showCoordinates(latitude, longitude) {
    var latlong = 'Latitude: ' + latitude + '<br />' +
                 'Longitude: ' + longitude;
    $('#coordinates').html(latlong);
  }

  function bindTapEvent() {
    $('.list-group-item').hammer().on('tap', function(e) {
      var previous = $(this).closest(".list-group").children(".active");
      previous.removeClass('active'); // previous list-item
      $(e.target).addClass('active'); // activated list-item
    });
  }

  function getPlaces() {
    $.getJSON('/google', function(places) {
      $.each(places, function(index, place) {
        var link = '<a class="list-group-item" href="share/' + (index + 1) + '/' + place.place_id + '">' + place.name + '</a>';
        $('#places').append(link);
      });
      bindTapEvent();
    });
  }

  getCoordinates(callback);

});
