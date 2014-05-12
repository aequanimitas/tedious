require 'net/http' 
require 'uri'
require 'dotenv'


module Tedious
  class Network
    class Route; end
    class Globe
      attr_accessor :router_ip
      def initialize router_ip
        @router_ip = router_ip
      end
      def reboot
        uri = URI.parse ENV['ROUTER_URL']
        hash = {
            "reboot" => ENV['QPARAM_REBOOT'],
            "encap" => ENV['QPARAM_ENCAP'],
            "username" => ENV['QPARAM_USERNAME'],
            "password" => ENV['QPARAM_PASSWORD'],
            "submit-url" => ENV['QPARAM_SUBMIT_URL']
        }
        query = hash
        http = Net::HTTP.new uri.host
        request = Net::HTTP::Post.new uri.path
        request.set_form_data(query)
        request.basic_auth ENV['BASIC_AUTH_USERNAME'], ENV['BASIC_AUTH_PASSWORD']
        http.request(request)
      end

      def stats
        {}
      end
      def self.down?
        # begin rescue end
        # return Net::HTTP.get_response(uri).code != "200" 
      end
    end
  end
end
