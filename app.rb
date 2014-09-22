
class MyApp < Sinatra::Base
  register Sinatra::Reloader

  configure do
    enable :logging
    set :yelp, Yelp::Client.new({ consumer_key: 'CxIgq_Qmno_4xNqoLCDngQ',
                                  consumer_secret: 'ot8NumqSPNmseSu8m2cWC0fNUD4',
                                  token: 'qgmf7ENPhkzFFNCgcAgMZlImrIoAto7S',
                                  token_secret: 'BHQ01dNmKDhVZybvPK3hC_zP0Xg'
                               })
    set :yelp_params, {
      term: 'food',
      limit: 20,
      sort: 1
    }
  end

  get '/' do
    slim :index
  end

  get '/address/:latitude/:longitude' do
    address_data = Geocoder.search([params[:latitude], params[:longitude]])[0].data
    logger.info "Current Address: #{address_data['formatted_address']}"
    address_data.to_json
  end

  get '/restaurants/:latitude/:longitude' do
    coordinates = { latitude: params[:latitude], longitude: params[:longitude] }
    restaurants = settings.yelp.search_by_coordinates(coordinates, settings.yelp_params)
    logger.info "Found #{restaurants.total} restaurants"
    restaurants.businesses.to_json
  end

end
