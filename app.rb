require 'rubygems'
require 'sinatra/base'
require 'sinatra/reloader'

class MyApp < Sinatra::Base
    register Sinatra::Reloader

  get '/' do
    'Hello world yo 2!'
  end

end
