require 'net/http'
require 'uri'
module Tedious
  def reboot_router
    uri = URI.parse ""
    http = Net::HTTP.new uri.host
    request = Net::HTTP::Post.new uri.path
    request.set_form_data({
      "reboot" => "",
      "encap" => "ppoe", 
      "username" => "",
      "password" => "",
      "submit-url" => ""
    })
    request.basic_auth "",""
    http.request(request)
  end
  module_function :reboot_router
end
