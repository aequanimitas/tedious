require 'minitest/autorun'
require 'mechanize'
require_relative '../tedious'

class TestLanWan < Minitest::Unit::TestCase
  def setup
    @url = 'http://192.168.254.254'
    @lanwan = Tedious::LanWan.new @url
  end

  def test_useragent_ie
    assert_equal 1, @lanwan.agent.user_agent
  end
  def test_page_as_mechpage_instance
    assert_equal 1, @lanwan.agent.post_connect_hooks.length
    assert_instance_of Mechanize::Page, @lanwan.agent.page, 'should be an instance of Mechanize::Page'
  end 

  def test_retrieve
    assert_instance_of Mechanize::Page || Mechanize::File, @lanwan.retrieve
  end

  def test_content_type_present
    assert_equal 'text/html', @lanwan.agent.page.header['content-type']
  end
end
