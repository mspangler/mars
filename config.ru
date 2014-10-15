require 'rubygems'
require 'sinatra'
require 'sinatra/reloader'
require 'slim'
require 'geocoder'
require 'yelp'
require 'google_places'
require 'unicorn'
require 'unicorn/worker_killer'
require 'mongoid'

# --- Start of unicorn worker killer code ---

max_request_min =  500
max_request_max =  600

# Max requests per worker
use Unicorn::WorkerKiller::MaxRequests, max_request_min, max_request_max

oom_min = (240) * (1024**2)
oom_max = (260) * (1024**2)

# Max memory size (RSS) per worker
use Unicorn::WorkerKiller::Oom, oom_min, oom_max

# --- End of unicorn worker killer code ---

configure do
  Mongoid.load!("config/mongoid.yml", :development)
end

require File.expand_path '../app.rb', __FILE__

run MyApp
