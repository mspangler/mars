
showError = (error) ->
  switch error.code
      when error.PERMISSION_DENIED
          console.log('User denied the request for Geolocation.')

      when error.POSITION_UNAVAILABLE
          console.log('Location information is unavailable.')

      when error.TIMEOUT
          console.log('The request to get user location timed out.')

      when error.UNKNOWN_ERROR
          console.log('An unknown error occurred.')

@getCoordinates = (callback) ->
  if navigator.geolocation
      navigator.geolocation.getCurrentPosition(callback, showError)
  else
      console.log('Geolocation is not supported by this browser.')
