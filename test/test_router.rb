require 'minitest/autorun'
require_relative '../lib/tedious'
require_relative 'utils'

describe 'router' do
  before do
    @router = Tedious::Network::Globe.new
  end
end
