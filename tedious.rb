module Tedious
  class LanWan
    attr_reader :lw_mech, :page
    def initialize url = 'http://127.0.0.1'
      @lw_mech = Mechanize.new
      ua_ie
      unless content_type_set?
        @lw_mech.post_connect_hooks << method(:force_media_type_content_html)
      end
      retrieve
    end 

    def retrieve
      @lw_mech.get(@url)
    end

    def content_type_set?
      header = retrieve.header
      header.has_key? 'content-type' || header.content_type.empty?
    end

    def force_media_type_content_html agent, uri, response, body
      response.content_type = 'text/html'
    end
  
    def ua_ie
      @lw_mech.user_agent = 'Windows IE 11 (Windows 8.1 64bit)'
    end
  end
end
