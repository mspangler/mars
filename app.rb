
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

class Place
  include Mongoid::Document
  field :name, type: String
  field :note, type: String
  embeds_one :location, class_name: 'Location'
  embeds_one :metadata, class_name: 'Metadata'
end

class MyApp < Sinatra::Base
  register Sinatra::Reloader

  configure do
    enable :sessions, :logging
    set :google, GooglePlaces::Client.new('AIzaSyCSYD8Tn3sOi5b1m6RWkJBy5QIKABp3dtE')
    set :google_params, {
      :types => [ 'restaurant', 'bar' ],
      :rankby => 'distance'
    }
  end

  get '/' do
    slim :index
  end

  get '/discover/' do
    slim :'discover/index'
  end

  get '/places/' do
    slim :'places/index'
  end

  get '/places/share/:index/:id' do
    @list_index = params[:index]
    @place = settings.google.spot(params[:id])
    slim :'places/share'
  end

  get '/address/:latitude/:longitude' do
    location = Geocoder.search([params[:latitude], params[:longitude]])[0]
    session[:location] = location
    logger.info ">>>>>> #{session[:location]}"
    location.data.to_json
  end

  get '/google' do
    logger.info "******** #{session[:location]}"
    places = settings.google.spots(session[:location].latitude,
                                   session[:location].longitude,
                                   settings.google_params)
    places.to_json
  end

  private

  def save_place(data)
     place = Place.create(
       name: 'place name',
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
