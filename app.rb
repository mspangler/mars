
class Location
  include Mongoid::Document
  field :latitude, type: Float
  field :longitude, type: Float
  field :city, type: String
  field :state, type: String
  field :country, type: String
end

class Metadata
  include Mongoid::Document
  field :user, type: String
  field :list_index, type: Integer
  field :created_at, type: DateTime
end

class Restaurant
  include Mongoid::Document
  field :name, type: String
  field :note, type: String
  embeds_one :location, class_name: 'Location'
  embeds_one :metadata, class_name: 'Metadata'
end

class MyApp < Sinatra::Base
  register Sinatra::Reloader

  configure do
    enable :logging
    set :google, GooglePlaces::Client.new('AIzaSyCSYD8Tn3sOi5b1m6RWkJBy5QIKABp3dtE')
    set :google_params, {
      :types => [ 'restaurant', 'bar' ],
      :rankby => 'distance'
    }
    set :yelp, Yelp::Client.new({ :consumer_key => 'CxIgq_Qmno_4xNqoLCDngQ',
                                  :consumer_secret => 'ot8NumqSPNmseSu8m2cWC0fNUD4',
                                  :token => 'qgmf7ENPhkzFFNCgcAgMZlImrIoAto7S',
                                  :token_secret => 'BHQ01dNmKDhVZybvPK3hC_zP0Xg'
                               })
    set :yelp_params, {
      :term => 'restaurants',
      :limit => 20,
      :sort => 1
    }
  end

  get '/' do
    slim :index
  end

  get '/places/' do
    slim :'places/index'
  end

  get '/share/' do
    slim :'share/index'
  end

  get '/address/:latitude/:longitude' do
    address_data = Geocoder.search([params[:latitude], params[:longitude]])[0].data
    #logger.info "Current Address: #{address_data['formatted_address']}"
    address_data.to_json
  end

  get '/google/:latitude/:longitude' do
    restaurants = settings.google.spots(params[:latitude], params[:longitude], settings.google_params)
    restaurants.to_json
  end

  get '/yelp/:latitude/:longitude' do
    coordinates = { latitude: params[:latitude], longitude: params[:longitude] }
    restaurants = settings.yelp.search_by_coordinates(coordinates, settings.yelp_params)
    restaurants.businesses.to_json
  end

  private

  def save_restaurant(data)
     restaurant = Restaurant.create(
       name: 'restaurant name',
       note: 'test from mark',
       location: {
         latitude: data[:latitude],
         longitude: data[:longitude],
         city: 'Amarillo',
         state: 'TX',
         country: 'US'
       },
       metadata: {
         user: 'mark',
         list_index: 1,
         created_at: DateTime.now
       }
     )
  end

end
