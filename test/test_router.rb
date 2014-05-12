require 'minitest/autorun'
require 'minitest/autorun'
require_relative '../lib/tedious'

describe 'router' do
  it "can be rebooted" do
    # given a router instance
    router = Tedious::Network::Router.new
    # when we call the reboot method
    # then we should be not be able to ping the default gateway
    Tedious::Network::Router.must_be :down?
  end

  it "should have stats" do
    # when a router instance
    router = Tedious::Network::Router.new
    # it should have a stats method that returns a hash
    router.must_respone_to stats
  end
end
