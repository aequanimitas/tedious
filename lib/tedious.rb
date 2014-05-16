require 'net/http' 
require 'uri'
require 'dotenv'

Dotenv.load

module Tedious
  class Network
    class Route; end
    class Globe
      attr_accessor :router_url, :query_hash
      def initialize options = {}
        @router_url = options['router_url'] || URI.parse(ENV['ROUTER_URL'])
        @query_hash = {
            'reboot' => ENV['QPARAM_REBOOT'],
            'encap' => ENV['QPARAM_ENCAP'],
            'username' => ENV['QPARAM_USERNAME'],
            'password' => ENV['QPARAM_PASSWORD'],
            'submit-url' => ENV['QPARAM_SUBMIT_URL']
        }
        @user_credentials = { 'username' => options['username'] || ENV['BASIC_AUTH_USERNAME'],
                              'password' => options['pass'] || ENV['BASIC_AUTH_PASSWORD']
                            }
      end
      def reboot
        http = Net::HTTP.new @router_url
        request = Net::HTTP::Post.new @router_url.path
        request.set_form_data(@query_hash)
        request.basic_auth @user_credentials['username'], @user_credentials['password']
        http.request(request)
      end

      def stats
        {}
      end
      def self.down?
        # begin rescue end
        # return Net::HTTP.get_response(uri).code != '200' 
      end
    end
  end
end
