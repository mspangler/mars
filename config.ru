require 'rubygems'
require 'sinatra'
require 'sinatra/reloader'
require 'slim'
require 'geocoder'
require 'yelp'

require File.expand_path '../app.rb', __FILE__

run MyApp
