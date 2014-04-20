module Tedious
  class LanWan
    attr_reader :page, :agent
    def initialize url = 'http://127.0.0.1'
      @agent = Mechanize.new
      @url = url
      unless content_type_set?
        @agent.post_connect_hooks << method(:force_media_type_content_html)
      end
      retrieve
    end 

    def retrieve
      @page = @agent.get(@url)
    end

    def content_type_set?
      header = retrieve.header
      header.has_key? 'content-type' || header.content_type.empty?
    end

    def force_media_type_content_html agent, uri, response, body
      response.content_type = 'text/html'
    end
  end
end
