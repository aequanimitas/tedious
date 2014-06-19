require 'net/http' 
require 'uri'

module Tedious
  class Network
    class Route; end
    class Router
      attr_accessor :url

      def url=(url)
        @url = URI.parse url
      end 

      def up?
        Net::HTTP.get_response(@url).code
      end
    end
  end
end
