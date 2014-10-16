
$ ->

  callback = (position) ->
    latitude = position.coords.latitude
    longitude = position.coords.longitude

    showCoordinates(latitude, longitude)
    getAddress(latitude, longitude)
    getRestaurants('google', latitude, longitude, parseGoogle)
    getRestaurants('yelp', latitude, longitude, parseYelp)

  showCoordinates = (latitude, longitude) ->
    latlong = 'Latitude: '  + latitude + '<br />' +
              'Longitude: ' + longitude
    $('#coordinates').html(latlong)

  getAddress = (latitude, longitude) ->
    $.getJSON('/address/' + latitude  + '/' + longitude, (data) ->
      $('#address').html('Address: ' + data.formatted_address)
    )

  bindTapEvent = ->
    $('.list-group-item').hammer().on('tap', (e) ->
      previous = $(this).closest(".list-group").children(".active")
      previous.removeClass('active')
      $(e.target).addClass('active')
    )

  getLink = (url, name) ->
    '<a target="_blank" class="list-group-item" href="' + url + '">' + name + '</a>'

  parseGoogle = (restaurant) ->
    getLink(restaurant.url, restaurant.name)

  parseYelp = (restaurant) ->
    getLink(restaurant.hash.mobile_url, restaurant.hash.name)

  getRestaurants = (service, latitude, longitude, parser) ->
    $.getJSON('/' + service + '/' + latitude + '/' + longitude, (restaurants) ->
      $.each(restaurants, (index, value) ->
        link = parser(value)
        $('#' + service).append(link)
      )
      bindTapEvent()
    )

  getCoordinates(callback)
