require 'minitest'
require 'mechanize/test_case'
require_relative '../tedious'

class TestLanWan < Mechanize::TestCase
  def setup
    url = 'http://192.168.254.254'
    @lanwan = Tedious::LanWan.new url
  end
  def test_initialize_mech_obj_on_init
    assert_equal Mechanize::Page, @lanwan.page.class
  end
end
