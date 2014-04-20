module Tedious
  class LanWan
    attr_reader :page, :agent
    def initialize url = 'http://127.0.0.1'
      @agent = Mechanize.new
      @page = agent.get(url)
    end
  end
end
