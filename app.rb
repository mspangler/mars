
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
  field :place_id, type: String
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
    @places = Place.all
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

  post '/places/share/' do
    save_place(params)
    redirect to('/discover/')
  end

  get '/address/:latitude/:longitude' do
    location = Geocoder.search([params[:latitude], params[:longitude]])[0]
    session[:location] = location
    location.data.to_json
  end

  get '/google' do
    places = settings.google.spots(session[:location].latitude,
                                   session[:location].longitude,
                                   settings.google_params)
    places.to_json
  end

  private

  def save_place(data)
    Place.create(
      place_id: data[:place_id],
      name: data[:place_name],
      note: data[:note],
      location: {
        latitude: session[:location].latitude,
        longitude: session[:location].longitude,
        city: session[:location].city,
        state: session[:location].state,
        country: session[:location].country
      },
      metadata: {
        user: 'mark',
        list_index: data[:list_index],
        created_at: DateTime.now
      }
    )
  end

end
