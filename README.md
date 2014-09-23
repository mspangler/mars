
Install
=======
1. Install RVM `\curl -L https://get.rvm.io | bash -s stable`
2. Install MongoDB - http://www.mongodb.org/
3. Fork project
4. `cd` into project
5. Verify everything was setup by confirming `ruby -v` is `Ruby-2.1.3` and `rvm gemset name` is `mars`
6. Run `bundle install`
7. Run `rackup` to start the local WEBrick server. The project uses Ngnix & Unicorn on the server but WEBrick is easier locally.
