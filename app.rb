require 'rubygems'
require 'sinatra/base'
require 'sinatra/reloader'
require 'slim'

class MyApp < Sinatra::Base
  register Sinatra::Reloader

  get '/' do
    slim :index
  end

end
