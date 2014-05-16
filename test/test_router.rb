require 'minitest/autorun'
require_relative '../lib/tedious'
require_relative 'utils'

describe 'router' do
  before do
    @server = 
  end
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
