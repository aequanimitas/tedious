require 'minitest/autorun'
require 'minitest/autorun'
require_relative '../lib/tedious'

describe 'router' do
  it "can be rebooted" do
    # given a router instance
    router = Tedious::Router.new
    # when we call the reboot method
    # then we should be not be able to ping the default gateway
    Tedious::Router.must_be :down?
  end
end
