require 'rubygems'
require 'sinatra/base'
require 'sinatra/reloader'
require 'slim'
require 'geocoder'
require 'yelp'

class MyApp < Sinatra::Base
  register Sinatra::Reloader

  configure do
    set :yelp, Yelp::Client.new({ consumer_key: 'CxIgq_Qmno_4xNqoLCDngQ',
                                  consumer_secret: 'ot8NumqSPNmseSu8m2cWC0fNUD4',
                                  token: 'qgmf7ENPhkzFFNCgcAgMZlImrIoAto7S',
                                  token_secret: 'BHQ01dNmKDhVZybvPK3hC_zP0Xg'
                               })
    set :yelp_params, {
      term: 'restaurants',
      limit: 10,
      sort: 1
    }
  end

  get '/' do
    slim :index
  end

  get '/address/:latitude/:longitude' do
    address_data = Geocoder.search([params[:latitude], params[:longitude]])[0].data
    address_data.to_json
  end

  get '/restaurants/:latitude/:longitude' do
    coordinates = { latitude: params[:latitude], longitude: params[:longitude] }
    restaurants = settings.yelp.search_by_coordinates(coordinates, settings.yelp_params)
    restaurants.businesses.to_json
  end

end
