
Setup
=====
1. Install RVM `curl -L https://get.rvm.io | bash -s stable`
2. Fork project
3. `cd` into project
4. Verify everything was setup by confirming `ruby -v` is `Ruby-2.1.3` and `rvm gemset name` is `mars`
5. Run `bundle install`
6. Run `rackup` to start the local WEBrick server. The project uses Ngnix & Unicorn on the server but WEBrick is easier locally.
