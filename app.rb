require 'rubygems'
require 'sinatra/base'
require 'sinatra/reloader'
require 'slim'
require 'yelp'

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
      term: 'restaurants',
      limit: 5
    }
    set :locale, { lang: 'en '}
  end

  get '/' do
    slim :index
  end

  get '/find/:longitude/:latitude' do
    logger.info "loading data"
    coordinates = { latitude: params[:latitude], longitude: params[:longitude] }
    foods = settings.yelp.search_by_coordinates(coordinates, settings.yelp_params, settings.locale)
    puts ">>> #{foods.businesses.to_json}"
    foods.businesses.to_json
  end

end
