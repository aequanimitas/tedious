require_relative '../../lib/tedious'

Given /I have a router with no credentials/ do
  @router = Tedious::Network::Router.new
end

When /I supply it with the router URL/ do
  @router.url = 'http://192.168.254.254'
end 

Then /the url should be an instance of URI::HTTP/ do
  @router.url.class.name == 'URI::HTTP'
end

Then /it should respond with OK/ do
  @router.up? == true
end
