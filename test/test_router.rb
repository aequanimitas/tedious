require 'minitest/autorun'
require 'minitest/autorun'
require_relative '../lib/tedious'

describe 'router' do
  @url = "http://192.168.254.254"
  describe "#stats" do
    it "should have a downstream key" do
      router = Tedious::Network::Globe.new @url
      router.stats.wont_be_empty 
    end
  end
  describe "#retrieve_page" do
    router = Tedious::Network::Globe.new @url
    # given a router ip address
    # when the index page is retrieved
    # then it should have the current stats of the router" 
  end
end
