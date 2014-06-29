require 'net/http' 
require 'uri'
require 'yaml'

module Tedious
  class Network
    class Router
      def reboot
        settings = YAML::load_file File.expand_path('..',File.dirname(File.expand_path(__FILE__))) + '/settings.yml'
        url = URI.parse 'http://192.168.254.254/goform/admin/formReboot'
        request = Net::HTTP::Post.new url.path
        request.basic_auth settings['username'], settings['password']
        request.set_form_data({"rebootMode" => "0", "reboot" => "Reboot", "submit-url" => "reboot.asp" })
        http = Net::HTTP.new url.host
        response = http.request(request)
      end
      def up?
        Net::HTTP.get_response(@url).code
      end
    end
  end
end
