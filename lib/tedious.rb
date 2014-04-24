require 'net/http'
require 'uri'
module Tedious
  class Router
    def reboot
      http = Net::HTTP.new uri.host
      request = Net::HTTP::Post.new uri.path
      request.set_form_data({
      })
      http.request(request)
    end

    def self.down?
      # begin rescue end
      # return Net::HTTP.get_response(uri).code != "200" 
    end
  end
end
