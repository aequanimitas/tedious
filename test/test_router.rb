require 'minitest/autorun'
require_relative '../lib/tedious'
require_relative 'utils'

describe 'Router' do
  before do
    @router = Tedious::Network::Router.new
    @url = 'http://192.168.254.254'
  end
  describe 'access with no credentials' do
    # Given a router instance
    # When I supply with a URL
    it '#url' do
      @router.must_respond_to :url
    end
    # When I supply it with a router URL
    # Then the router should respond with OK
    describe 'supplied with a url' do
      it 'still must respond with OK' do
        @router.url = @url
        @router.up?.must_equal '200'
      end
    end
  end
end
