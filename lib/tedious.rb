require 'net/http' 
require 'uri'

module Tedious
  class Network
    class Route; end
    class Router
      attr_accessor :url, :query_hash

      def url=(url)
        @url = URI.parse url
      end 

      def up?
        Net::HTTP.get_response @url 
      end
    end
  end
end
